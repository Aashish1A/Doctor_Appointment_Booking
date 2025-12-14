import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
// import Razorpay from "razorpay";

// API for user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
      return  res.json({ success: false, message: "All fields are required" });
    }

    // Validating user email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if(password.length < 8){
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });

    // Save user to database
    await newUser.save();

    // Creating JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    return res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // Creating JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, message: "Login successful", token });
    }else {
        return res.json({ success: false, message: "Invalid password" });
    }

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to get user info
export const getUserInfo = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await userModel.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !address || !dob || !gender){
            return res.json({ success: false, message: "All fields are required" });
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender});
        
        if(imageFile){
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, {image: imageUrl});
        }

        return res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId; // Get from auth middleware

    // 1. Fetch doctor data
    const docData = await doctorModel.findById(docId).select('available slots_booked fees');
    
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.status(400).json({ success: false, message: "Doctor is not available" });
    }

    // 2. Check if slot is already booked (access as object, not Map)
    let slots_booked = docData.slots_booked || {};
    
    if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
      return res.status(400).json({ success: false, message: "Slot not available" });
    }

    // 3. Create appointment with only IDs, not full documents
    const appointmentData = {
      userId: userId,
      docId: docId,
      slotDate,
      slotTime,
      amount: docData.fees,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // 4. Update user's appointments array
    await userModel.findByIdAndUpdate(userId, {
      $push: { appointments: newAppointment._id }
    });

    // 5. Update doctor's slots and appointments (access as object, not Map)
    if (slots_booked[slotDate]) {
      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked: slots_booked,
      $push: { appointments: newAppointment._id }
    });

    res.status(201).json({ success: true, message: "Appointment booked successfully" });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// API to get user appointments
export const getUserAppointments = async (req, res) => {

  try {
    const {userId} = req.body;  
    
    // Populate docId to get doctor's full information
    const appointments = await appointmentModel.find({ userId })
      .populate('docId', 'name image speciality address fees') // Populate doctor fields
      .sort({ date: 1 }); // Sort by most recent first

    res.json({ success: true, appointments });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Note: Ensure appointmentModel has 'docId' and 'userId' as ObjectId references to respective models.

// API to cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    // Find the appointment and verify it belongs to the user
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Verify the appointment belongs to the requesting user
    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    // Update the appointment to cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Remove the booked slot from doctor's slots_booked
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData) {
      let slots_booked = doctorData.slots_booked || {};
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
      }
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment cancelled successfully" });

  } catch (error) {
    console.error("Cancel appointment error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // API to make payment of appointment using razorpay
// export const makePayment = async (req, res) => {

//   try {
    

//   } catch (error) {
    
//   }
// }
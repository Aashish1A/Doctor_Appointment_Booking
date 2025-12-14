import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


// API for adding doctor
export const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // validating email format
        if(validator.isEmail(email) === false){
            return res.json({ success: false, message: "Invalid email format" });
        }

        // validating strong password
        if(password.length < 8){
            return res.json({ success: false, message: "Password is not strong enough" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;

        // creating new doctor object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal server error" });
    }
}


// API For Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        // Check if admin exists
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            // Create JWT token
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({ success: true, message: "Login successful", token });
        }else{
            return res.json({ success: false, message: "Invalid email or password" });
        }


    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

// API to get all doctors list for admin panel

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        return res.json({ success: true, data: doctors });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Internal server error" });
    }
}


// API to get all appointment list
export const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        .populate('userId', 'name image dob email') // Populate user data
        .populate('docId', 'name image speciality') // Populate doctor data
        .sort({ date: -1 });

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// API to change appointment for admin
export const AppointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Find the appointment and verify it belongs to the user
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
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

// API to get dashboard data for admin panel
export const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointment.length,
            latestAppointments: await appointmentModel.find({})
                .populate('docId', 'name image speciality') // Populate doctor data
                .populate('userId', 'name image') // Populate user data
                .sort({ date: -1 })
                .limit(5)
        }

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
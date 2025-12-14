import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailability = async(req, res) => {
  try {

    const {docId} = req.body;

    const doctor = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {available: !doctor.available});
    
    res.json({success: true, message: "Availability status changed"});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message });
  }
}

export const doctorList = async(req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password","-email"]);
    res.json({success: true, doctors});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message });
  }
}

// API for doctor login 
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ success: true, token, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get doctor appointment for doctor panel
export const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const allAppointments = await appointmentModel.find({});
  
    // Check appointments with this docId
    const appointments = await appointmentModel.find({ docId })
      .populate('userId', 'name email image dob gender address phone')
      .sort({ date: -1 });

    res.json({ success: true, appointments });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to mark appointment completed
export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: "Appointment completed" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release the slot
    const { slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData) {
      let slots_booked = doctorData.slots_booked || {};
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
      }
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment cancelled" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel
export const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    // Get all appointments for this doctor
    const appointments = await appointmentModel.find({ docId });

    // Calculate earnings
    let earnings = 0;
    appointments.forEach(item => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    // Get unique patients count
    let patients = [];
    appointments.forEach(item => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    // Get latest 5 appointments with patient data
    const latestAppointments = await appointmentModel
      .find({ docId })
      .populate('userId', 'name image')
      .sort({ date: -1 })
      .limit(5);

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments
    };

    res.json({ success: true, dashData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API to get doctor profile for doctor panel
export const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const doctor = await doctorModel.findById(docId).select(["-password","-email"]);
    res.json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to update doctor profile for doctor panel
export const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available
    });
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
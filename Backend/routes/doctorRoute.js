import express from "express";
import { appointmentsDoctor, cancelAppointment, completeAppointment, doctorDashboard, doctorList, doctorLogin, getDoctorProfile, updateDoctorProfile } from "../controllers/doctorController.js";
import { authDoctor } from "../middlewares/authDoctor.js";

// Routes
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, getDoctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
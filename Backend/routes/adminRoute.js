import express from 'express';
import { addDoctor, adminLogin, getAllDoctors } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/admin-login', adminLogin);
adminRouter.get('/get-all-doctors', authAdmin, getAllDoctors);

export default adminRouter;
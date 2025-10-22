import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// API Endpoints
app.use("/api/admin", adminRouter);

app.get('/', (req, res) => res.send('Hello from Doctor Appointment Booking Backend!'));

// Listener
app.listen(port, () => console.log(`Server is running on port: ${port}`));

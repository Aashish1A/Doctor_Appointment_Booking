# 🏥 Doctor Appointment Booking System

A comprehensive full-stack web application for managing doctor appointments, built with the MERN stack. This platform connects patients with healthcare professionals, streamlining the appointment booking process with separate interfaces for patients, doctors, and administrators.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248?logo=mongodb)

---

## ✨ Features

### 👤 Patient Portal
- **User Authentication**: Secure registration and login system with JWT tokens
- **Doctor Discovery**: Browse doctors by specialty (General Physician, Gynecologist, Dermatologist, etc.)
- **Appointment Booking**: Select available time slots and book appointments
- **Profile Management**: Update personal information and view appointment history
- **Real-time Slot Availability**: See only available time slots based on doctor's schedule
- **Appointment Status Tracking**: View pending, completed, and cancelled appointments

### 👨‍⚕️ Doctor Panel
- **Secure Login**: Dedicated authentication for healthcare professionals
- **Dashboard Analytics**: View earnings, total appointments, and patient count
- **Appointment Management**: View, complete, or cancel appointments
- **Profile Editing**: Update consultation fees, availability, and contact information
- **Patient Information**: Access patient details for scheduled appointments

### 👨‍💼 Admin Panel
- **Doctor Management**: Add new doctors with complete profiles and credentials
- **Appointment Overview**: Monitor all appointments across the platform
- **Dashboard Statistics**: Track total doctors, appointments, and patients
- **Doctor Availability Control**: Manage doctor availability status
- **System Administration**: Comprehensive control over the entire platform

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Elegant notifications
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and management

### Admin Panel
- **React.js** - Same tech stack as Frontend
- **Context API** - State management
- **Tailwind CSS** - Consistent styling

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager
- Cloudinary account (for image uploads)

### Clone the Repository
```bash
git clone https://github.com/Aashish1A/Doctor_Appointment_Booking.git
cd Doctor_Appointment_Booking
```

### Backend Setup
```bash
cd Backend
npm install

# Create .env file
cat > .env << EOL
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
EOL

# Start the server
npm run server
```

### Frontend Setup
```bash
cd ../Frontend
npm install

# Create .env file
echo "VITE_BACKEND_URL=http://localhost:3000" > .env

# Start the development server
npm run dev
```

### Admin Panel Setup
```bash
cd ../Admin
npm install

# Create .env file
echo "VITE_BACKEND_URL=http://localhost:3000" > .env

# Start the admin panel
npm run dev
```

---

## 🚀 Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd Backend
   npm run server
   ```
   Backend will run on `http://localhost:3000`

3. **Start Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Start Admin Panel**
   ```bash
   cd Admin
   npm run dev
   ```
   Admin panel will run on `http://localhost:5174`

---

## 📁 Project Structure

```
Doctor_Appointment_Booking/
├── Backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── mongodb.js          # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js  # Admin business logic
│   │   ├── doctorController.js # Doctor business logic
│   │   └── userController.js   # User business logic
│   ├── middlewares/
│   │   ├── authAdmin.js        # Admin authentication
│   │   ├── authDoctor.js       # Doctor authentication
│   │   ├── authUser.js         # User authentication
│   │   └── multer.js           # File upload handling
│   ├── models/
│   │   ├── appointmentModel.js # Appointment schema
│   │   ├── doctorModel.js      # Doctor schema
│   │   └── userModel.js        # User schema
│   ├── routes/
│   │   ├── adminRoute.js       # Admin API routes
│   │   ├── doctorRoute.js      # Doctor API routes
│   │   └── userRoute.js        # User API routes
│   ├── .env                     # Environment variables
│   ├── server.js               # Server entry point
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/             # Images and static files
│   │   ├── Components/         # Reusable components
│   │   ├── Context/            # React Context for state
│   │   ├── Pages/              # Page components
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── .env                     # Environment variables
│   └── package.json
│
└── Admin/
    ├── src/
    │   ├── assets/             # Images and static files
    │   ├── components/         # Reusable components
    │   ├── context/            # React Context for state
    │   ├── pages/              # Admin & Doctor pages
    │   ├── App.jsx             # Main admin component
    │   └── main.jsx            # Entry point
    ├── .env                     # Environment variables
    └── package.json
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/prescripto
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=admin123
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

### Frontend & Admin (.env)
```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🌐 API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/get-profile` - Get user profile
- `POST /api/user/update-profile` - Update user profile
- `POST /api/user/book-appointment` - Book appointment
- `GET /api/user/appointments` - Get user appointments
- `POST /api/user/cancel-appointment` - Cancel appointment

### Doctor Routes
- `POST /api/doctor/login` - Doctor login
- `GET /api/doctor/appointments` - Get doctor appointments
- `GET /api/doctor/dashboard` - Get dashboard data
- `GET /api/doctor/profile` - Get doctor profile
- `POST /api/doctor/update-profile` - Update doctor profile
- `POST /api/doctor/complete-appointment` - Mark appointment as completed
- `POST /api/doctor/cancel-appointment` - Cancel appointment

### Admin Routes
- `POST /api/admin/add-doctor` - Add new doctor
- `POST /api/admin/admin-login` - Admin login
- `GET /api/admin/get-all-doctors` - Get all doctors
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/dashboard` - Get dashboard statistics
- `POST /api/admin/cancel-appointment` - Cancel appointment

---

## 🎨 Key Features Explained

### 1. Smart Slot Management
- Automatically filters out booked time slots
- Shows only available slots to prevent double booking
- Dynamic slot generation based on doctor's working hours (10 AM - 9 PM)
- 30-minute interval slots

### 2. Role-Based Access Control
- Three distinct user roles: Patient, Doctor, Admin
- JWT-based authentication for each role
- Protected routes and API endpoints
- Secure password hashing with bcrypt

### 3. Real-Time Updates
- Appointment status updates reflect immediately
- Doctor availability changes sync across the platform
- Dashboard statistics update in real-time

### 4. Responsive Design
- Mobile-first approach with Tailwind CSS
- Seamless experience across all devices
- Optimized for tablets, phones, and desktops

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aashish Kumar**
- GitHub: [@Aashish1A](https://github.com/Aashish1A)
- Repository: [Doctor_Appointment_Booking](https://github.com/Aashish1A/Doctor_Appointment_Booking)

---

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by the need for efficient healthcare appointment management
- Built with ❤️ using modern web technologies

---

## 📸 Screenshots

*Add screenshots of your application here*

### Patient Dashboard
![Patient Dashboard](./screenshots/patient-dashboard.png)

### Doctor Panel
![Doctor Panel](./screenshots/doctor-panel.png)

### Admin Panel
![Admin Panel](./screenshots/admin-panel.png)

---

## 🐛 Known Issues & Future Enhancements

### Planned Features
- [ ] Email notifications for appointment confirmations
- [ ] SMS reminders for upcoming appointments
- [ ] Payment gateway integration
- [ ] Video consultation feature
- [ ] Prescription management
- [ ] Medical records storage
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Doctor ratings and reviews

---

## 📞 Support

For support, email aashish@example.com or open an issue in the GitHub repository.

---

<div align="center">
  <strong>⭐ Star this repository if you find it helpful!</strong>
</div>
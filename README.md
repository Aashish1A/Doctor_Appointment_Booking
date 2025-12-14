# 🏥 QuickMed - Healthcare Appointment Booking System

<div align="center">

![QuickMed Logo](https://img.shields.io/badge/QuickMed-Healthcare-blue?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Quick Medical Consultancy Made Easy**

[Demo](#) • [Documentation](#installation) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About QuickMed](#about-quickmed)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About QuickMed

**QuickMed** is a comprehensive healthcare appointment booking system that streamlines the process of scheduling medical consultations. Built with the MERN stack, it provides three distinct portals for seamless interaction between patients, doctors, and administrators.

### Why QuickMed?

- ⚡ **Quick** - Book appointments in under 2 minutes
- 🏥 **Medical** - Complete healthcare management
- 💼 **Professional** - Enterprise-grade platform
- 🔒 **Secure** - JWT-based authentication
- 📱 **Responsive** - Works on all devices

---

## ✨ Features

### 👨‍⚕️ For Patients (Frontend)

- 🔐 **User Authentication** - Secure registration and login with JWT
- 👨‍⚕️ **Browse Doctors** - Search and filter doctors by speciality
- 📅 **Smart Booking** - Real-time slot availability checker
- 💳 **Payment Integration** - Cash and online payment options
- 📱 **My Appointments** - View, track, and cancel appointments
- 👤 **Profile Management** - Update personal information
- ⭐ **Doctor Details** - View doctor profiles, experience, and fees
- 🔔 **Appointment Status** - Track completed, pending, and cancelled appointments

### 👨‍⚕️ For Doctors (Admin Panel)

- 📊 **Dashboard** - Overview of earnings, appointments, and patients
- 📋 **Appointment Management** - View and manage patient appointments
- ✅ **Mark Complete** - Mark consultations as completed
- ❌ **Cancel Appointments** - Cancel appointments with slot release
- 👤 **Profile Management** - Update fees, availability, and address
- 📈 **Analytics** - View patient count and earnings
- 🕐 **Latest Bookings** - Quick view of recent appointments

### 👨‍💼 For Admins (Admin Panel)

- ➕ **Add Doctors** - Onboard new doctors with complete details
- 📋 **Doctor Management** - View, edit, and manage doctor profiles
- 📊 **Dashboard** - System-wide analytics and statistics
- 👥 **All Appointments** - Monitor all appointments across the platform
- 🔒 **Access Control** - Secure admin authentication
- 📈 **System Analytics** - Total doctors, patients, and appointments
- 🎯 **Appointment Actions** - Cancel appointments from admin side

---

## 🛠️ Tech Stack

### Frontend (Patient Portal)
- **React.js** - UI library for building user interfaces
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend (API Server)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image upload and management
- **Multer** - File upload middleware
- **Validator** - Data validation

### Admin Panel
- **React.js** - Same stack as frontend
- **Shared Context** - For admin and doctor management
- **Protected Routes** - Role-based access control

---

## 🏗️ System Architecture

```
QuickMed/
│
├── Frontend/                 # Patient Portal
│   ├── src/
│   │   ├── Components/      # Reusable components
│   │   ├── Context/         # React Context API
│   │   ├── Pages/           # Page components
│   │   └── assets/          # Images and static files
│   └── package.json
│
├── Admin/                    # Admin & Doctor Panel
│   ├── src/
│   │   ├── components/      # Shared components
│   │   ├── context/         # Context providers
│   │   ├── pages/
│   │   │   ├── Admin/      # Admin pages
│   │   │   └── Doctor/     # Doctor pages
│   │   └── assets/
│   └── package.json
│
└── Backend/                  # API Server
    ├── config/              # Configuration files
    ├── controllers/         # Route controllers
    ├── models/              # Database models
    ├── routes/              # API routes
    ├── middlewares/         # Custom middlewares
    └── server.js            # Entry point
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Cloudinary account (for image uploads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Aashish1A/Doctor_Appointment_Booking.git
cd Doctor_Appointment_Booking
```

### Step 2: Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
PORT=3000
```

Start backend server:

```bash
npm run server
```

Backend will run on `http://localhost:3000`

### Step 3: Frontend Setup

```bash
cd ../Frontend
npm install
```

Create `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Admin Panel Setup

```bash
cd ../Admin
npm install
```

Create `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start admin panel:

```bash
npm run dev
```

Admin panel will run on `http://localhost:5174`

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/quickmed` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_min_32_chars` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_SECRET_KEY` | Cloudinary secret key | `your_secret_key` |
| `PORT` | Server port | `3000` |

### Frontend & Admin (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:3000` |

---

## 📡 API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/profile` | Get user profile | ✅ |
| POST | `/update-profile` | Update user profile | ✅ |
| POST | `/book-appointment` | Book an appointment | ✅ |
| GET | `/appointments` | Get user appointments | ✅ |
| POST | `/cancel-appointment` | Cancel appointment | ✅ |

### Doctor Routes (`/api/doctor`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | Doctor login | ❌ |
| GET | `/appointments` | Get doctor appointments | ✅ Doctor |
| GET | `/dashboard` | Get dashboard data | ✅ Doctor |
| GET | `/profile` | Get doctor profile | ✅ Doctor |
| POST | `/update-profile` | Update doctor profile | ✅ Doctor |
| POST | `/complete-appointment` | Mark appointment complete | ✅ Doctor |
| POST | `/cancel-appointment` | Cancel appointment | ✅ Doctor |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | Admin login | ❌ |
| POST | `/add-doctor` | Add new doctor | ✅ Admin |
| GET | `/doctors` | Get all doctors | ✅ Admin |
| POST | `/change-availability` | Toggle doctor availability | ✅ Admin |
| GET | `/appointments` | Get all appointments | ✅ Admin |
| POST | `/cancel-appointment` | Cancel any appointment | ✅ Admin |
| GET | `/dashboard` | Get admin dashboard data | ✅ Admin |

---

## 📁 Project Structure

```
Backend/
├── config/
│   ├── cloudinary.js       # Cloudinary configuration
│   └── mongodb.js          # MongoDB connection
├── controllers/
│   ├── adminController.js  # Admin business logic
│   ├── doctorController.js # Doctor business logic
│   └── userController.js   # User business logic
├── middlewares/
│   ├── authAdmin.js        # Admin authentication
│   ├── authDoctor.js       # Doctor authentication
│   ├── authUser.js         # User authentication
│   └── multer.js           # File upload handling
├── models/
│   ├── appointmentModel.js # Appointment schema
│   ├── doctorModel.js      # Doctor schema
│   └── userModel.js        # User schema
├── routes/
│   ├── adminRoute.js       # Admin routes
│   ├── doctorRoute.js      # Doctor routes
│   └── userRoute.js        # User routes
└── server.js               # Application entry point
```

---

## 📸 Screenshots

### Patient Portal
*[Add screenshots of patient portal]*

### Doctor Panel
*[Add screenshots of doctor dashboard]*

### Admin Panel
*[Add screenshots of admin dashboard]*

---

## 🎨 Key Features Implementation

### 1. Real-Time Slot Management
```javascript
// Dynamic slot generation with 30-minute intervals
// Automatically excludes booked slots
// Shows next 7 days availability
```

### 2. Role-Based Authentication
```javascript
// Three separate authentication middlewares
// JWT token verification
// Password hashing with bcrypt
```

### 3. Image Upload System
```javascript
// Cloudinary integration
// Automatic image optimization
// Secure URL generation
```

### 4. Appointment Status Tracking
```javascript
// Pending, Completed, Cancelled states
// Real-time status updates
// Automatic slot release on cancellation
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔮 Future Enhancements

- [ ] Video consultation feature
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] SMS/Email notifications
- [ ] Prescription management
- [ ] Medical records storage
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-based doctor recommendations
- [ ] Patient reviews and ratings
- [ ] Telemedicine integration

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Contact

**Aashish Kumar**

- GitHub: [@Aashish1A](https://github.com/Aashish1A)
- Project Link: [https://github.com/Aashish1A/Doctor_Appointment_Booking](https://github.com/Aashish1A/Doctor_Appointment_Booking)

---

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Cloudinary](https://cloudinary.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ by Aashish Kumar

</div>
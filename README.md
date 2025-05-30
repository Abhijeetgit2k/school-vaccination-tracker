# School Vaccination Tracker

A full-stack application for managing and tracking school vaccination drives, designed for school coordinators.

## Features

- 🔐 Secure authentication system
- 📊 Interactive dashboard with key metrics
- 👩‍🎓 Student management with bulk upload
- 💉 Vaccination drive scheduling and tracking
- 📄 Comprehensive reporting system

## Tech Stack

### Frontend
- React.js 18
- MUI (Material-UI) v5 for components
- React Router v6 for navigation
- Redux Toolkit for state management
- Axios for API calls
- Formik & Yup for form handling and validation
- Recharts for data visualization
- CSV handling with csv-parser and json2csv

### Backend
- Node.js with Express
- MySQL with Sequelize ORM
- JWT for authentication
- Express Validator for input validation
- Multer for file uploads
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/school-vaccination-tracker.git
cd school-vaccination-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash/powershell
cd backend
npm start
```

2. Start the frontend development server:
```bash/pwershell
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5002

## Project Structure

```
school-vaccination-tracker/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # Redux store
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
│
├── backend/               # Node.js backend application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Utility functions
│   └── config/           # Configuration files
│
└── docs/                 # Documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


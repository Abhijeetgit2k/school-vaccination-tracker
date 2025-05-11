# School Vaccination Tracker Backend

This is the backend server for the School Vaccination Tracker application. It provides APIs for managing schools, students, vaccination records, and vaccination drives.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_root_password
   DB_NAME=school_vaccination_tracker
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. Create the MySQL database:
   ```sql
   CREATE DATABASE school_vaccination_tracker;
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on port 5000 by default.

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get current user profile
- PUT `/api/users/profile` - Update user profile
- PUT `/api/users/change-password` - Change user password

### Schools
- GET `/api/schools` - Get all schools
- GET `/api/schools/:id` - Get a single school
- POST `/api/schools` - Create a new school
- PUT `/api/schools/:id` - Update a school
- DELETE `/api/schools/:id` - Delete a school

### Students
- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get a single student
- POST `/api/students` - Create a new student
- PUT `/api/students/:id` - Update a student
- DELETE `/api/students/:id` - Delete a student

### Vaccinations
- GET `/api/vaccinations` - Get all vaccinations
- GET `/api/vaccinations/:id` - Get a single vaccination
- POST `/api/vaccinations` - Create a new vaccination record
- PUT `/api/vaccinations/:id` - Update a vaccination record
- DELETE `/api/vaccinations/:id` - Delete a vaccination record

### Vaccination Drives
- GET `/api/vaccination-drives` - Get all vaccination drives
- GET `/api/vaccination-drives/:id` - Get a single vaccination drive
- POST `/api/vaccination-drives` - Create a new vaccination drive
- PUT `/api/vaccination-drives/:id` - Update a vaccination drive
- DELETE `/api/vaccination-drives/:id` - Delete a vaccination drive

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer your-jwt-token
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests 
# 💼 Job Recurator

A full-stack **Job Recruitment Management System** built using the **MERN Stack** that connects job seekers, interviewers, and administrators on a single platform.

Job Recurator streamlines the recruitment process from **job posting and application management to interview scheduling and offer letter management**.

---

## 📌 About The Project

**Job Recurator** is designed to simplify and organize the complete recruitment workflow.

The platform provides different dashboards and permissions for three types of users:

* 👤 **Job Seeker**
* 🧑‍💼 **Interviewer**
* 👨‍💻 **Admin**

Job seekers can explore and apply for jobs, manage their resumes, track applications, attend scheduled interviews, and manage offer letters.

Interviewers can view candidates and manage interview-related activities.

Administrators can manage jobs, applications, candidates, interviews, and offer letters through an administrative dashboard.

---

## ✨ Key Features

### 👤 Job Seeker

* User registration and login
* JWT-based authentication
* Browse available jobs
* View job details
* Apply for jobs
* Upload resume
* View and update resume
* Track applied jobs
* View application details
* View scheduled interviews
* View interview details
* View offer letters
* Accept or delete offer letters
* Forgot password functionality
* Reset password functionality
* Responsive user dashboard

### 🧑‍💼 Interviewer

* Secure interviewer login
* Role-based dashboard
* View assigned candidates
* View candidate/application details
* Manage interview information
* View scheduled interviews
* Access interview details

### 👨‍💻 Admin

* Admin authentication
* Admin dashboard
* View total users
* View total resumes
* View total applications
* View total offer letters
* Create and manage jobs
* View job applications
* Manage candidates
* Schedule interviews
* Manage interview details
* Create and manage offer letters
* Monitor recruitment activities

---

## 🔄 Recruitment Workflow

```text
                ┌─────────────────┐
                │   Registration  │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │      Login      │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │  Browse Jobs    │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Apply for Job   │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Application     │
                │    Review       │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │    Interview    │
                │   Scheduling    │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │    Interview    │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │  Offer Letter   │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Accept / Delete │
                └─────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* **React.js** – User interface
* **React Router DOM** – Client-side routing
* **Axios** – API communication
* **Tailwind CSS** – Styling
* **DaisyUI** – UI components
* **Vite** – Frontend development and build tool

### Backend

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB object modeling
* **JWT** – Authentication
* **bcrypt** – Password hashing
* **Multer** – File upload handling
* **Nodemailer** – Email functionality

### Tools

* Visual Studio Code
* MongoDB Compass
* Postman
* Git
* GitHub

---

## 🏗️ Project Structure

```text
Job-Recurator/
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── Api/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   │
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 👥 User Roles

The application implements role-based access control with three roles.

| Role              | Responsibilities                                         |
| ----------------- | -------------------------------------------------------- |
| 👤 Job Seeker     | Search jobs, apply, manage resume, interviews and offers |
| 🧑‍💼 Interviewer | Manage and view interview-related activities             |
| 👨‍💻 Admin       | Manage users, jobs, applications, interviews and offers  |

---

## 🔐 Authentication & Authorization

Job Recurator uses **JWT-based authentication** to secure user accounts and protected routes.

After login, the user's role determines which dashboard and features they can access.

Supported roles:

```text
jobseeker
interviewer
admin
```

Passwords are securely hashed using **bcrypt** before being stored in the database.

Protected API routes use authentication middleware to verify the user's identity and authorization.

---

## 💼 Job Management

Administrators can create job postings containing information such as:

```text
Job Title
Company Name
Description
Job Type
Skills
Salary
Location
Requirements
Experience
```

Job seekers can browse available jobs and view complete job information before applying.

---

## 📝 Application Management

The application module manages the relationship between job seekers and job postings.

### Application Flow

```text
Job Seeker
     ↓
Select Job
     ↓
Submit Application
     ↓
Application Stored
     ↓
Admin Reviews Application
     ↓
Candidate Selected
     ↓
Interview Scheduled
```

This allows administrators to keep track of candidates and their applications.

---

## 📄 Resume Management

Job seekers can manage their resumes directly from their dashboard.

### Resume Features

* Upload resume
* View resume
* Update resume
* Use resume during job application

Supported file formats:

```text
PDF
JPG / JPEG
PNG
```

File uploads are handled through the backend using **Multer**.

---

## 📅 Interview Management

The interview module allows administrators to schedule interviews for selected candidates.

Interview information includes:

```text
Candidate
Job
Interviewer
Interview Date
Interview Time
Interview Mode
Meeting Link
```

### Interview Flow

```text
Application
     ↓
Candidate Selection
     ↓
Interviewer Assignment
     ↓
Interview Scheduling
     ↓
Candidate Views Interview
     ↓
Interview
```

---

## ✉️ Offer Letter Management

After the recruitment process, an offer letter can be created for a selected candidate.

The candidate can:

* View the offer letter
* Accept the offer
* Delete the offer

The application also uses **Nodemailer** for email-related functionality.

---

## 🔑 Forgot Password

The application includes a password recovery system.

```text
Login
  ↓
Forgot Password
  ↓
Enter Registered Details
  ↓
Reset Link
  ↓
Create New Password
  ↓
Login
```

A secure reset token is used during the password reset process.

---

## 🗄️ Database Models

The application uses **MongoDB** with **Mongoose**.

Main models include:

```text
User
Job
Resume
Application
Interview
OfferLetter
Joining
```

These models are connected according to the recruitment workflow and are used to manage users, jobs, applications, interviews, resumes, and offer letters.

---

## 🔌 API Structure

The backend provides RESTful API routes for different modules.

```text
/api/users
/api/resume
/api/job
/api/application
/api/interview
/api/offerletter
```

Each module contains separate routes and controllers to keep the backend organized and maintainable.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/akashsingh145/job-recruiter.git
```

Navigate to the project:

```bash
cd job-recruiter
```

---

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:5000
```

---

## 🔒 Environment Variables

For security, sensitive information should be stored inside the `.env` file.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

> ⚠️ Never upload your actual `.env` file, passwords, database credentials, or secret keys to GitHub.

---

## 📊 Admin Dashboard

The admin dashboard provides an overview of recruitment activities.

It can display statistics such as:

```text
Total Users
Total Resumes
Total Applications
Total Offer Letters
```

This allows the administrator to monitor the overall recruitment system from one place.

---

## 📱 Responsive Design

The frontend is designed using **Tailwind CSS** with responsive layouts so that the application can adapt to different screen sizes.

The dashboards, navigation, tables, forms, and other components are designed with responsive behavior in mind.

---

## 🔮 Future Enhancements

Possible future improvements include:

* Real-time notifications using WebSockets
* Advanced job search and filtering
* AI-based job recommendations
* Resume parsing
* Online interview integration
* Interview feedback system
* Application status notifications
* Advanced recruitment analytics
* Automated email notifications
* Cloud-based file storage
* Deployment to production

---

## 🎯 Project Objectives

The main objectives of Job Recurator are:

* Simplify the recruitment process
* Provide a centralized recruitment platform
* Connect job seekers with job opportunities
* Help administrators manage recruitment activities
* Provide interview scheduling functionality
* Provide resume management
* Digitize offer letter management
* Implement secure authentication and role-based authorization

---

## 📚 Learning Outcomes

This project helped implement and understand:

* MERN Stack development
* React component-based architecture
* REST API development
* CRUD operations
* JWT authentication
* Role-based authorization
* Password hashing with bcrypt
* MongoDB and Mongoose
* File upload handling
* Form validation
* Email integration
* API integration using Axios
* Responsive UI development
* State management using Redux Toolkit
* Git and GitHub
* Full-stack application architecture

---

## 🚀 Future Deployment

The project can be deployed using cloud-based services for both frontend and backend.

The production version can use:

```text
Frontend → Cloud Hosting
Backend  → Cloud Server
Database → MongoDB Atlas
```

---

## 👨‍💻 Author

### Akash Singh

**BCA Graduate | Full Stack Web Developer**

Interested in building modern web applications using JavaScript and the MERN Stack.

### Skills

```text
JavaScript
React.js
Node.js
Express.js
MongoDB
Mongoose
Tailwind CSS
Redux Toolkit
Git
GitHub
REST API
JWT Authentication
```

---

## ⭐ Acknowledgement

This project was developed as a full-stack web development project to gain practical experience in designing and developing a complete recruitment management system using modern web technologies.

---

## 📄 License

This project is created for educational and portfolio purposes.

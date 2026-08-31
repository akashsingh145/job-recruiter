import "dotenv/config";
import cors from "cors"
 import express from "express"
import connectDB from "./config/db.js"
import userRoutes from "./route/user.route.js"
import resumeRoutes from "./route/resume.route.js"
import jobRoutes from "./route/job.route.js"
import  applicationRoute from "./route/application.route.js"
import  interviewRoute  from "./route/interview.route.js"
import offerLetterRoute from "./route/offerletter.route.js"
import joiningRoute from "./route/joining.route.js"
import userDashboardRoute from "./route/userDashboard.route.js"
import adminDashboardRoute from "./route/adminDashboard.route.js"
import path from "path"
import { adminDashboard } from "./controller/adminDashboard.js";
import { interviwerDashboard } from "./controller/interviewerDashboard.js";

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
connectDB();
const app =express();
const allowedOrigins = [
  "http://localhost:5173", 
  "https://wgl1jx1d-5173.inc1.devtunnels.ms", // Your frontend dev tunnel
  "http://192.168.1.15:5173" // Add your local IP address + frontend port if testing over Wi-Fi
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Print the origin to the terminal so we can see what the phone is sending
      console.log("Request came from Origin:", origin); 
      
      // 2. Allow ALL origins temporarily so your phone can log in
      callback(null, true); 
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/users", userRoutes)
app.use("/api/resume",resumeRoutes)
app.use("/api/job",jobRoutes)
app.use("/api/application",applicationRoute)
app.use("/api/interview",interviewRoute)
app.use("/api/offerLetter",offerLetterRoute)
app.use("/api/joining", joiningRoute);
app.use("/api/user-dashboard",userDashboardRoute)
app.use("/api/admin-dashboard",adminDashboard)
app.use("/api/interviewer-dashboard",interviwerDashboard)
app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${process.env.PORT} (listening on all network interfaces)`);
}); 
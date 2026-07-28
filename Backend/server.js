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
import joiningRoute from "./route/joining.route.js";

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
connectDB();
const app =express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.json());
app.use("/api/users", userRoutes)
app.use("/api/resume",resumeRoutes)
app.use("/api/job",jobRoutes)
app.use("/api/application",applicationRoute)
app.use("/api/interview",interviewRoute)
app.use("/api/offerLetter",offerLetterRoute)
app.use("/api/joining", joiningRoute);
app.listen (process.env.PORT,()=>{
    console.log ("server started")
 })
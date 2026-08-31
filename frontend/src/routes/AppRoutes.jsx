import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/Forget";
import ResetPassword from "../pages/Reset";
import Register from "../pages/Register";
import Job from "../pages/Job"
import DashboardLayout from "../Layout/DashboardLayout"
import UserDashboard from "../pages/User/UserDashboard";
import JobDetail from "../pages/JobDetail"
import Resume from "../pages/User/Resume"
import AppliedJob from "../pages/User/AppliedJob"
import Profile from "../pages/User/Profile";
import Interviews from "../pages/User/Interview";
import Offerletter from "../pages/User/Offerletter";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageJobs from "../pages/Admin/ManageJob";
import Createjob from "../pages/Admin/CreateJob";
import User from "../pages/Admin/User";
import ManageResume from "../pages/Admin/MangeResume";
import ManageInterview from "../pages/Admin/Interview";
import Application from "../pages/Admin/Application";
import ManageOfferletter from "../pages/Admin/ManageOfferletter";
import Createinterview from "../pages/Admin/CreateInterview";
import Createofferletter from "../pages/Admin/Createofferletter"
import InterviewerLayout from "../Layout/InterviewerLayout";
import InterviewerDashboard from "../pages/Interviewer/InterviewerDashboard";
import InterviewerManageJob from "../pages/Interviewer/ManageJob";
import InterviewerCreateJob from "../pages/Interviewer/CreateJob";
import InterviewerApplication from "../pages/Interviewer/Application";
import InterviewerManageResume from "../pages/Interviewer/ManageResume";

import InterviewerManageInterview from "../pages/Interviewer/ManageInterview";
import InterviewerManageOfferletter from "../pages/Interviewer/ManageOfferletter";
function AppRoutes() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
        <Route path="/register" element={<Register/>} />
        
        <Route path="/job"element={<Job/>}/>
        <Route path ="/job/:id"element={<JobDetail/>}/>
        {/* user */}
        <Route path="/user" element={<DashboardLayout/>}>
        <Route path="dashboard"element={<UserDashboard/>}/>
        <Route path="resume"element={<Resume/>}/>
        <Route path="applied"element={<AppliedJob/>}/>
        <Route path="profile"element={<Profile/>}/>
        <Route path="interview"element={<Interviews/>}/>
        <Route path="offerletter"element={<Offerletter/>}/>
        </Route>
        {/* admin */}
        <Route path="/admin"element={<AdminLayout/>}>
        <Route path="dashboard"element={<AdminDashboard/>}/>
        <Route path="managejob"element={<ManageJobs/>}/>
        <Route path="createjob"element={< Createjob/>}/>
        <Route path="user"element={<User/>}/>
        <Route path="manageresume"element={<ManageResume/>}/>
        <Route path="manageinterview" element={<ManageInterview/>}/>
        <Route path="manageofferletter" element={<ManageOfferletter/>}/>
        
    
        

<Route
  path="createinterview/:applicationId"
  element={<Createinterview />}
/>
        <Route path ="application"element={<Application/>}/>
        <Route path ="manageofferletter" element={<ManageOfferletter/>}/>
        <Route path="createofferletter/:applicationId"element={<Createofferletter/>}/>
      </Route>
      {/* Interviewer */}
      <Route path="/interviewer" element={<InterviewerLayout/>}>
      <Route path ="dashboard"element={< InterviewerDashboard/>}/>
      <Route path ="interviewermanagejob"element={<InterviewerManageJob/>}/>
      <Route path="interviewercreatejob"element={<InterviewerCreateJob/>}/>
      <Route path ="interviewerapplication"element={<InterviewerApplication/>}/>
      <Route path="interviewermanageresume"element={< InterviewerManageResume/>}/>
      <Route path="interviewercreateinterview/:applicationId"element={<Createinterview/>}/>
      <Route path="interviewermanageinterview"element={< InterviewerManageInterview/>}/>
      <Route path="interviewermanageofferletter"element={<InterviewerManageOfferletter/>}/>
      <Route path="interviewercreateofferletter/:applicationId"element={<Createofferletter/>}/>

      </Route>
    
      </Routes>

  );
}

export default AppRoutes;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<h1>Home Test</h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;
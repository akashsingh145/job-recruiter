import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Job from "../pages/Job"

// import jobDetail from "../pages/jobDetail"
function AppRoutes() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/job"element={<Job/>}/>
        {/* <Route path ="job/:id"element={<jobDetail/>}/> */}
      
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
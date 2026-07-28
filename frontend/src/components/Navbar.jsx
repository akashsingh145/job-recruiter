import { Link } from "react-router-dom";
function Navbar(){
    return(
       <nav className="bg-blue-400 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Recurator</h1>
        <ul className="flex gap-6">
           <li>
            <Link to="/"> Home</Link>
            </li> 
           <li> 
            <Link to ="/job"> job</Link>
            </li>
           <li> 
           <Link to="/login"> Login</Link> 
            </li>
           <li >
            <Link to ="/register"> Register</Link> 
            </li>
            
        </ul> 


       </nav>
    )
}

export default Navbar;
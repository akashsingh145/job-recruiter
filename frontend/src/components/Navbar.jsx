import { Link } from "react-router-dom";
import{useState} from "react"
function Navbar(){
    const[isOpen,setIsOpen]=useState(false)
    return(
       <nav className="bg-blue-400 text-white p-4 ">
        <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
            Job Recurator</h1>
            <button
    className="md:hidden text-2xl"
    onClick={() => setIsOpen(!isOpen)}
>
    ☰
</button>
        <ul className="hidden md:flex gap-6 items-center">
           <li>
            <Link to="/"
        
            > Home</Link>
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

        </div>

          {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/job">Job</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
    )}
       </nav>
    )
}

export default Navbar;
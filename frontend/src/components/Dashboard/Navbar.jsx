import { FaBell,FaUserCircle,FaSearch } from "react-icons/fa";
import {useState,useEffect} from "react"

function Navbar({setIsOpen}){
    const[user,setUser]=useState(null)
    useEffect(()=>{
        const storedata = localStorage.getItem("user")
        setUser(JSON.parse(storedata))
    },[])
    return(

        
        <header className="flex items-center justify-between bg-white shadow-md px-4 sm:px-6 py-4">
            <div>
                <button
                type="button"
              className="md:hidden text-2xl text-slate-700"
              onClick={() => setIsOpen(true)}
             >
             ☰
         </button>
            <h1 className="text-2xl font-bold text-slate-800"> User DashBoard</h1>
            <p className="text-gray-500 text-sm">Welcome Back {user?.username}</p>
            </div>
            
            
       
             

             {/* user */}
             <div className="flex items-center gap-2 sm:gap-3 cursor-pointe">
                <FaUserCircle className="text-4xl text-cyan-500"/>
                <div className="hidden sm:block">
                    <h1 className="text-semibold">{user?.username}</h1>
                    <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
             </div>
    

        </header>    
        )
}
export default Navbar;
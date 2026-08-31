import { FaBell,FaUserCircle,FaSearch } from "react-icons/fa";
import {useState,useEffect} from "react"
function Navbar({setIsOpen}){
    const[user,setUser]=useState(null)
    useEffect(()=>{
       const storeUser=localStorage.getItem("user") ;
       if(storeUser){
        setUser(JSON.parse(storeUser));
       }
    },[])
    return(
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
            <div>
                 <button
                type="button"
              className="md:hidden text-2xl text-slate-700"
              onClick={() => setIsOpen(true)}
             >
             ☰
         </button>
            <h1 className="text-2xl font-bold text-slate-800"> Interviewer DashBoard</h1>
            <p className="text-grey-500 text-sm">Welcome Back {user?.username}</p>
            </div>
            
            
            
             

             {/* user */}
             <div className="flex item-center gap-3 cursor-pointer">
                <FaUserCircle className="text-4xl text-cyan-500"/>
                <div>
                    <h1 className="text-semibold">{user?.username||"username"}</h1>
                    <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
             </div>
    

        </header>    
        )
}
export default Navbar;
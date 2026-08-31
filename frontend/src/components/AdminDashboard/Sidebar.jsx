import { NavLink, useNavigate } from "react-router-dom";
import{
    FaTachometerAlt,
    FaUser,
    FaBriefcase,
    FaFileAlt,
    FaFilePdf,
    FaClipboardList,
    FaFileSignature,
    FaSignOutAlt
} from "react-icons/fa";
function Sidebar({isOpen,setIsOpen}){
const menuItem =[
    {
         name:"Dashboard",
         path:"/admin/dashboard",
        icon:<FaTachometerAlt/>

    },
    {
       name:"User",
       path:"/admin/user",
       icon:<FaUser/>
    },
    {
       name:"Manage Jobs",
       path:"/admin/managejob",
       icon:<FaBriefcase />
    },
    {
        name:"Create Job",
        path:"/admin/createjob",
        icon:<FaBriefcase/>
    },
    {
        name:"Application",
        path:"/admin/application",
        icon:< FaFileAlt/>
    }, 
    {
        name:"Manage Resume",
        path:"/admin/manageresume",
        icon:<FaFilePdf/>
    },
    // {
    //     name:"Create Interview",
    //     path:"/admin/createinterview/:applicationId",
    //     icon:<FaClipboardList/>
    // },
    {
       name:"Manage Interview",
       path:"/admin/manageinterview",
       icon: <FaClipboardList/>
    },
    {
        name:"Manage OfferLetter",
        path:"/admin/manageofferletter",
        icon:<FaSignOutAlt />
    },
    // {
    //     name:"Create OfferLetter",
    //     path:"/admin/createofferletter",
    //     icon:<FaSignOutAlt/>
    // }
];
const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};
return(
    <aside className={`
        fixed md:static z-50
        w-64 min-h-screen
        bg-slate-900 text-white shadow-lg
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}>
        <div className="p-6 text-center border-b border-slate-700" >
            <h1 className=" text-2xl text-bold text-cyan-400"> 
                 Job Recurator</h1>

                               <button
        className="md:hidden text-xl"
        onClick={() => setIsOpen(false)}
    >
        ✕
    </button>

        </div>
         {/* Menu */}
                <nav className="mt-6">
                    {menuItem.map((item)=>
                    <NavLink
                    key={item.path}
                    to={item.path}
                    className={({isActive})=>
                    ` flex items-center gap-3 px-6 py-4 transition-all
                    ${isActive
                       ? "bg-cyan-500 text-white"
                       : "hover:bg-slate-800" 
                    }`
                    }>
                      <span className="text-lg"> {item.icon}</span> 
                      <span>{item.name}</span> 
                    </NavLink>

                    )}
                {/* logout */}
                 <button 
                onClick={handleLogout}
            className="flex items-center gap-3 w-full px-6 py-4 hover:bg-red-600 transition-all text-left">
             <FaSignOutAlt/>
            LogOut
           </button>
                
             </nav>       
                    
    </aside>
)


}
export default Sidebar

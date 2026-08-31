import {useState,useEffect} from "react";
import API from "../../../Api/axios";
function UserTable(){
    const[users,setUsers]=useState([])
    const[loading,setLoading]=useState(true)
    const getalluser =async()=>{
        try{
            const api= await API.get("/users/all")
             console.log("USER API RESPONSE:", api.data);
            setUsers(api.data.users)
        }catch(error){
            console.log("error fetching user:",error)
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getalluser();
    },[])
    if(loading){
        return
        <h2 className="p-4 text-lg font-semibold">loading..</h2>
        
    }

    const handledelete =async(id) => {
        const confirmDelete = window.confirm("Are you sure you want delete user")
        if(!confirmDelete){
        return;
        }
        try{
            await API. delete(`/users/${id}`)
            setUsers((prevUsers)=>
                 prevUsers.filter((user) => user._id !== id))
            alert("user delete successfully")

        }catch(error){
            console.log(error)
            alert("delete failed")
        }
    }



    return(
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6  mt-4 sm:mt-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4"> User Table</h1>
            <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Role</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>{
                        return(
                        <tr
                            key={ user._id}
                            className="border-b hover:bg-gray-100 transition"
                            >
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3"> {user.phone}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3 text-center">
                                    <button 
                                    onClick={()=>handledelete(user._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                        Delete
                                    </button>
                                </td>

                        </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default UserTable;
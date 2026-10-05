import API from "../../../Api/axios";
import{
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query"
function UserTable(){
    // get all user
    const getAllUser = async()=>{
        const api = await API.get("/users/all")
        return api.data.users
    }
    
    // useQuery 
    const{data:users=[],isLoading,isError}=useQuery({
        queryKey:["users"],
        queryFn:getAllUser
    })

    // queryClient
    const queryClient = useQueryClient();

    // delete user

    const deleteUser = async(id)=>{
        const api = await API.delete(`/users/${id}`)
        return api.data.user
    }
    // useMutation
    const deleteMutation =useMutation({
        mutationFn:deleteUser,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                querykey:["users"]
            })
            alert("User delete successfully")
        },
        onError:(error)=>{
             console.log("DELETE ERROR:", error);
             console.log("RESPONSE:", error.response);
              console.log("STATUS:", error.response?.status);
              console.log("DATA:", error.response?.data);

              console.log(error)
              alert("delete failed")
        }
    })

    const handleDelete = async(id)=>{
        const confirmDelete = window.confirm(" Are you sure you want delete user")
        if(!confirmDelete){
            return

        }
        deleteMutation.mutate(id)
    }

    // loading
    if(isLoading){
        return(
            <h2 className="p-4 text-lg font-semibold">loading...</h2>
        )
    }

    // error
    if(isError){
        return(
            <h2 className ="p-4 text-lg font-semibold"> Error fetching User</h2>
        )
    }



    return(
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6  mt-4 sm:mt-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4"> User Table</h1>
            <div className="w-full overflow-x-auto">
            <table className="w-full min-w-600px border-collapse">
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
                                    onClick={()=>handleDelete(user._id)}
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
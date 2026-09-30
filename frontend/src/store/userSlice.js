import {createSlice} from "@reduxjs/toolkit"
const initialState ={     //always intialvalue null hi rakte hai
    user:null
}
 const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginUser:(state,action)=>{           //state current state ke liye use kiye and action ka use hua hai 
                                                //reducer ko btane ke liye ki kya perfor krna hai

            state.user = action.payload

        },
        logout:(state)=>{
            state.user = null
        }
    }
 })

 export  const  {loginUser,logout} = userSlice.actions
 export default userSlice.reducer;

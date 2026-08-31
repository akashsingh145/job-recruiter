import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        match:[/^[A-Za-z][A-Z a-z 0-9_]*$/,
            "username must be start a letter"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            "password must be 8 character"
        ]
        
 },
    role:{
        type:String,
        enum:["jobseeker","interviewer","admin"],
        default:"jobseeker",
    },
    phone:{
        type:String,
        required:true,
        match:[/^[0-9]{10}$/,"number must bhi 10 digit"]
    },
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordExpire:{
        type:Date,
        default:null
    }
})
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
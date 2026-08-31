 import mongoose from "mongoose";
 const resumeSchema = new mongoose.Schema({
candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
},

    candidateName:{
        type:String,
        required:true,
    },
    skills:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    education:{
        type:String,
        required:true,
    },
    resumeFile:{
        type:String,
        required:true,
    }
 })
 const Resume = mongoose.model("Resume", resumeSchema);
 export default Resume;
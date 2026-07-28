import mongoose from "mongoose"
const applicationSchema = new mongoose.Schema({
     candidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
     },
     jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true,
     },
     resumeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resume",
        required:true,
     },
     status:{
        type:String,
        enum:[
            "Applied",
            "shortlisted",
            "interviewschedule",
            "select",
            "reject",
            "joined",
        ],
        default:"Applied"
     },

})
const Application = mongoose.model("Application",applicationSchema)
export default Application;
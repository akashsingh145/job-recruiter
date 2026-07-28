import mongoose from "mongoose";
const interviewSchema = new mongoose.Schema({
    applicationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"application",
        required:true,
    },
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
interviewerName:{
type:String,
require:true,
},

    interviewDate:{
        type:String,
        required:true,
    },
    interviewTime:{
        type:String,
        required:true,
    },
    interviewMode:{
        type:String,
        enum :[ "online","offline"],
        required:true,
    },
    meetingLink:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:[
            "scheduled",
            "completed",
            "selected",
            "deleted",
            "cancelled"
        ],
        default:"scheduled"
    },
    
feedback:{
    type:String,
}
})
const interview = mongoose.model("interview",interviewSchema);
export default interview;

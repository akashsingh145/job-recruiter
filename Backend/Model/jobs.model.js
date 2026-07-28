import mongoose from "mongoose";
const jobSchema =new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    requirements:{
        type:String,
        require:true,

    }
})
const job = mongoose.model("job",jobSchema);
export default job;

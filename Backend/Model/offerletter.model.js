import mongoose from "mongoose";

const offerLetterSchema = new mongoose.Schema({
 applicationId:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"Application",
    required:true,
 },
 candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
 },
jobId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required: true
    },
    companyName:{
        type:String,
        required:true,

    },
designation:{
type:String,
required:true
},
salary: {
        type:String,
        required: true
    },
    
    joiningDate:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["sent","accepted","rejected"],
        default:"sent"
    }
});

const OfferLetter = mongoose.model("OfferLetter", offerLetterSchema);
export default OfferLetter;
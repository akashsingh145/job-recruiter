import mongoose from "mongoose";

const joiningSchema = new mongoose.Schema({

    applicationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },

    offerLetterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OfferLetter",
        required: true
    },

    candidateId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    joiningDate:{
        type:String,
        required:true
    },

    joiningLocation:{
        type:String,
        required:true
    },

    department:{
        type:String,
        required:true
    },

    designation:{
        type:String,
        required:true
    },

    employeeType:{
        type:String,
        enum:[
            "Full Time",
            "Part Time",
            "Internship",
            "Contract"
        ],
        default:"Full Time"
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Joined",
            "Rejected"
        ],
        default:"Pending"
    },

    documents:{
        type:[String],
        default:[]
    }

},{
    timestamps:true
});


const Joining = mongoose.model("Joining", joiningSchema);

export default Joining;
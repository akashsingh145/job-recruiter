import OfferLetter from "../Model/offerletter.model.js";
import User from "../Model/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
export const createOfferletter =async(req,res)=>{
    // console.log("Create Offer Letter API Hit");
    try{
        const{ applicationId, candidateId, companyName,jobId,designation,salary, joiningDate, status}=req.body
        const offerletter = new OfferLetter({
            applicationId,
             candidateId,
             jobId,
             companyName,
             designation,
             salary,
              joiningDate,
               status 
    })
 await  offerletter .save();
 const user = await User.findById(candidateId);

if (!user) {
    return res.status(404).json({
        success: false,
        message: "Candidate not found"
    });
}

await sendEmail(
    user.email,
    "Offer Letter",
    `
    <h2>Congratulations ${user.username}</h2>

    <p>Your offer letter has been generated successfully.</p>

    <p><b>Company:</b> ${companyName}</p>
    <p><b>Designation:</b> ${designation}</p>
    <p><b>Salary:</b> ₹${salary}</p>
    <p><b>Joining Date:</b> ${joiningDate}</p>

    <br>

    <p>Regards,<br>HR Team</p>
    `
);

 res.status(200).json({success:true,message:"create  offerLetter successfully",offerletter})
    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}

// get all offerletter
 export const getAllOfferLetter =async(req,res)=>{
    try{
        const offerletter =await OfferLetter.find()
        .populate("jobId")
        .populate("applicationId")
        .populate("candidateId");
         res.status(200).json({success:true,offerletter})

    }catch(error){
        res.status (400).json ({success:false,message:error.message})
    }
 }

//  get offerletter by id

export const getOfferLetterById = async(req,res)=>{
    try{ 
        const offerLetter = await OfferLetter.findById(req.params.id);
        if(!offerLetter){
            return res.status(400).json({ success:false,message:"offerLetter not found"})
        }
        res.status (200).json({ success:true,offerLetter})

    } catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}

// update offerLetter

export const updateOfferLetter = async(req,res)=>{
    try{ 
        const offerLetter = await OfferLetter.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!offerLetter){
            return res.status(400).json({ success:false,message:"offerletter not found"})
        }
        res.status(200).json({success:true,message:"offerletter update successfully",offerLetter})

    }catch(error){
        res.status (400).json({success:false,message:error.message})
    }
}

// accepted offerletter
export const acceptedOfferLetter = async(req,res)=>{
    try{
        const offerLetter = await OfferLetter.findByIdAndUpdate(
            req.params.id,
            {status:"Accepted"},
            {new:true}
        )
        if(!offerLetter){
            return res.status(400).json({success:false,message:"offerLetter not found"})

        }
        res.status(200).json({success:true,message:"offerLetter accepted",offerLetter})

    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
// rejected offer letter
export const rejectOfferLetter = async(req,res)=>{
    try{
        const offerLetter = await OfferLetter.findByIdAndUpdate(
            req.params.id,
            {status:"Rejected"},
            {new:true}
        )
        if(!offerLetter){
            return res.status(400).json({success:false,message:"offerLetter not found"})

        }
        res.status(200).json({success:true,message:"offerLetter rejected",offerLetter})

    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}

// deleteofferleter
export const deleteOfferLetter = async(req,res)=>{
    try{ 
        const offerLetter = await OfferLetter.findByIdAndDelete(
            req.params.id,
        
    
        );
        if(!offerLetter){
            return res.status(400).json({ success:false,message:"offerletter not found"})
        }
        res.status(200).json({success:true,message:"offerletter  delete successfully",offerLetter})

    }catch(error){
        res.status (400).json({success:false,message:error.message})
    }
}
import Application from "../Model/application.model.js";
import Resume from "../Model/resume.model.js";
import OfferLetter from "../Model/offerletter.model.js";
import Interview from "../Model/interview.model.js";

export const getUserDashboard =async(req,res)=>{
    try{
        const userId =req.user.id;
        // total apply
        const applyJob = await Application.countDocuments({
            candidateId:userId
        });
        // upload resume
        const resume = await Resume.findOne({
            candidateId:userId
        });
        // interview
        const interviews = await Interview.countDocuments({
            candidateId:userId
        });
        // offerletter
        const offerletters =await OfferLetter.countDocuments({
            candidateId:userId
        });
        res.status(200).json({
            success:true,
          data:{
            AppliedJob: applyJob,
        Resume: resume ? 1 : 0,
        Interview: interviews,
        Offerletter: offerletters
          },  
        })

    }catch(error){
        res.status(500).json({success:false,message:"internal server error"})


    }
}
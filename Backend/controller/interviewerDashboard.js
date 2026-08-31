import Resume from "../Model/resume.model.js";
import Application from "../Model/application.model.js";
import OfferLetter from "../Model/offerletter.model.js";
export const interviwerDashboard =async(req,res)=>{
    try {
        // total Resume
    const resume = await Resume.countDocuments();
    // total Application
    const application = await Application.countDocuments();
    // total Offerletter
    const offerletter = await OfferLetter.countDocuments();
    res.status(200).json({succes:true,
        resume,
        application,
        offerletter
    })
    }catch(error){
res.status(400).json({success:false,error:"internal server error"})
    }
    
}
import User from "../Model/user.model.js";
import Application from "../Model/application.model.js";
import Resume from "../Model/resume.model.js";
import OfferLetter from "../Model/offerletter.model.js";
export const adminDashboard = async(req,res)=>{
    try{
    
        // total user
        const totalUsers = await User.countDocuments();
        
        
        // Resume 
        const totalResume = await Resume.countDocuments();
        // Applcation
        const totalApplication = await Application.countDocuments();
        // offerlettter
        const totalOfferLetter =await OfferLetter.countDocuments()
        //    console.log("Dashboard Data:", {
        //     totalUsers,
        //     totalResume,
        //     totalApplication,
        //     totalOfferLetter
        // });
            
        res.status(200).json({
            success:true,
            totalUsers,
          
            totalResume,
            totalApplication,
            totalOfferLetter,
        })
        
        

    }catch(error){
        //   console.log("ADMIN DASHBOARD ERROR:", error);
        res.status(500).json({success:false,message:"internal server error"})

    }
}
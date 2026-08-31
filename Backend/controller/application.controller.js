import Application from "../Model/application.model.js";
import Resume from "../Model/resume.model.js";
export const applyJob = async(req,res)=>{
    console.log (req.body)
    try{
        const{jobId}=req.body
        const candidateId=req.user._id;
        const existingApplication =await Application.findOne( {jobId,candidateId})

        console.log("Logged user:", req.user._id);
        const resume = await Resume.findOne({
            candidateId: candidateId
        });
          console.log("Found resume:", resume);

        if(!resume){
            return res.status(400).json({
                success:false,
                message:"Please create resume first"
            });
        }

        if(existingApplication){
           return res.status(400).json({
                success:false,
                message:"you have already applied for this job"
             })
        } 
        // create application
        const application = new  Application ({
            candidateId,
            resumeId:resume._id,
            jobId,
        })
        await application.save();
        res.status(200).json({
            success:true,
            message:"job applied successfully",
            application

        })
        
    }catch(error){
        console.log(error)
        res.status(400).json({success:false,message:error.message})
    }
}
// getmy application
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidateId: req.user._id,
    })
      .populate("jobId")
      .populate("resumeId");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all application
 export const getAllApplication = async(req , res) =>{
    try{
         const application = await Application.find()
            .populate("candidateId")
            .populate("resumeId")
            .populate("jobId")

            res.status(200).json({success: true,application})
          }catch(error){
        res.status(400).json({ success:false,message:error.message})
    }
 }
//  get application by id
export const getApplicationById =async(req,res)=>{
    try{ 
        const application = await Application.findById(req.params.id)
        .populate("candidateId")
        .populate("resumeId")
        .populate("jobId")
        if(!application){
           return res.status(400).json({
                success:false,
                message:"application not found"
            })
        }
        res.status(200).json({
            success:true,
            application
        })

    }catch(error){ 
        res.status(400).json({
            success:false,
            message: error.message
        })

    }
    
}
// get application one candidate
// export const getMyapplication =async(req,res)=>{
//     try{
//         const application = await Application.find({candidateId:req.params.candidateId})
//         .populate("jobId")
//         .populate("resumeId")
        
//         res.status(200).json({
//             success:true,
//             application
//         })

//     }catch(error){
//         res.status(400).json({success:false,message:error.message})
//     }
// }

// update application

export const updateApplication = async(req,res)=>{
    try{
        const{status} = req.body
        const application = await Application.findByIdAndUpdate(req.params.id,{status},{new:true})
        if(!application){
          return  res.status(400).json({success:false,message:"application not found"})
        }
        res.status(200).json({success:true,message:"application update successfully"})

    }catch(error){
         res.status (400).json({success:false,message:error.message})

    }
       
    
}

// delete application
export const deleteApplication =async(req,res)=>{
    try{
        const application = await Application.findByIdAndDelete(req.params.id)
        if(!application){
            return res.status (400).json({success:false,message:"application not found"})
        }
        res.status(200).json({success:true,message:"application delete successfully",application})

    }catch(error){
        res.status(400) .json ({
            success:false,
            message:error.message
        })
    }
}



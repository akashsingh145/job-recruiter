import Application from "../Model/application.model.js";
export const applyJob = async(req,res)=>{
    console.log (req.body)
    try{
        const{candidateId,jobId,resumeId}=req.body
        const existingApplication =await Application.findOne( {resumeId,candidateId})
        if(existingApplication){
           return res.status(400).json({
                success:false,
                message:"you have already applied for this job"
             })
        } 
        // create application
        const application = new  Application ({
            candidateId,
            resumeId,
            jobId,
        })
        await application.save();
        res.status(200).json({
            success:true,
            message:"job applied successfully",
            application

        })
        
    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
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



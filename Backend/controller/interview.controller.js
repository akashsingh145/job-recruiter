import Interview from "../model/interview.model.js"
export  const scheduleInterview = async(req,res)=>{
    try{
const {applicationId,jobId,candidateId,interviewerName,interviewDate,interviewTime,interviewMode,meetingLink,status,feedback}=req.body
const interview = new Interview({
    applicationId,
    jobId,
    candidateId,
    interviewerName,
    interviewDate,
    interviewTime,
    interviewMode,
    meetingLink,
    status,
    feedback
          
})
await interview.save();
res.status(200).json({success:true,message:"interview schedule successfully",interview})
    }catch(error){
        res.status(404).json({success:false,message:error.message})

    }
}

// get all interview
export const getAllInterview =async(req,res)=>{
    try{
        const interview =await Interview. find();
        res.status(200).json ({success:true,interview})

    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}

// get interview by id
export const getInterViewById =async(req,res)=>{
    try{
        const interview =await Interview.findById (req.params.id)
        if(!interview){
            return res.status (400).json({success:false, message:"interview not found"})
        }
        res.status(200).json({success:true,interview})

    }catch(error){
        res.status(400).json({success:false,message:error.message})

    }
}

// update interview
export const updateInterview =async(req,res)=>{
    try{
        const interview =await Interview.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
    if(!interview){
        return res.status(400).json({
            success:false,
            message:"interview not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"interview update successfully",
        interview
    })

    }
    catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}
// delete interview
export const deleteInterview = async(req,res)=>{
    try{
        const interview =await Interview.findByIdAndDelete(req.params.id)
        if(!interview){
            return res.status(400).json({message:"interview not found",success:false})
        }
        res.status(200).json({message:"interview delete successfully",success:true,interview})

    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }

}
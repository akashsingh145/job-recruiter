
import Interview from "../Model/interview.model.js";
import Application from "../Model/application.model.js";
import User from "../Model/user.model.js";
import Job from "../Model/jobs.model.js";

export const scheduleInterview = async (req, res) => {
  try {
    const {
        applicationId,
      interviewerName,
      interviewDate,
      interviewTime,
      interviewMode,
      meetingLink,
      location,
      status,
    } = req.body;


  

    // Check candidate applied for this job
    const application = await Application.findById(applicationId);
     


    if (!application) {
      return res.status(404).json({
        success: false,
        message: "This candidate has not applied for this job",
      });
    }

    // Create Interview
    const interview = new Interview({
      applicationId: application._id,
      jobId: application.jobId,
      candidateId: application.candidateId,
      interviewerName,
      interviewDate,
      interviewTime,
      interviewMode,
      meetingLink,
      location,
      status,
      
    });

    await interview.save();

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      interview,
    });

  } catch (error) {
    console.log("Schedule Interview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all interview
export const getAllInterview =async(req,res)=>{
    try{
        const interview =await Interview. find()
           .populate("jobId")
           .populate("candidateId")
           .populate("applicationId")
        res.status(200).json ({success:true,interview})

    }catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}

// get interview by id
export const getInterViewById =async(req,res)=>{
    try{
        const interview =await Interview.findById ( req.params.id)
        if(!interview){
            return res.status (400).json({success:false, message:"interview not found"})
        }
        res.status(200).json({success:true,interview})

    }catch(error){
        res.status(400).json({success:false,message:error.message})

    }
}
export const getMyInterview = async (req, res) => {
  try {
    // console.log("🔥 USER INTERVIEW API HIT");
    // console.log("User ID:", req.user._id);

    const interviews = await Interview.find({
      candidateId: req.user._id,
    })
     .populate("candidateId") 
    .populate("jobId")
      .populate("applicationId");

    // console.log("User Interviews:", interviews);

    res.status(200).json({
      success: true,
      interviews,
    });

  } catch (error) {
    console.log("Get My Interview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
import Resume from "../Model/resume.model.js"

export const uploadResume =async(req,res) =>{
    // console.log(req.user);
    try{ 
        const{skills,experience, education,} =req.body
const resumeFile = req.file ? req.file.filename : "";
   
const exiting = await Resume.findOne({
     candidateId: req.user._id,
})
 if(exiting){
   return res.status (200).json({message:"resume already exist"})
 }

//  create resume
const resume = new Resume({
    candidateId: req.user._id,
    candidateName: req.user.username,
    skills,
    experience,
    education,

    resumeFile
})
await resume.save();
res.status (201).json({ success:true,message:"resume uploaded successfully", resume})


}catch(error){
        res.status(400).json({success:false,message:error.message})
    }
}

// getmyresume
export const getMyResume = async(req,res)=>{
    try{
        const resume = await Resume.findOne({
            candidateId:req.user._id
        })
        if(!resume){
            return res.status(400).json({
                success:false,
                message:"Resume not found"
            })
        }
        res.status(200).json({
            success:true,
            resume
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong ",
            error:error.message
        })

    }
}
// get all resume
export const getAllResume= async(req,res) =>{
    try{
        const resumes = await Resume.find();
        res.status(200).json ({success:true,resumes })
    } catch(error){
        res.status(500).json({success:false,message:error.message})

    }
}
// get resume by id 
export const getResumeById = async(req,res) =>{
    try{
        const resume = await Resume.findById(req.params.id)
        if(!resume){
            res.status(404).json({
                message:"Resume not found"
            })
        }
        res.status(200).json({
            success:true,
            resume,
        })

    } catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
// delete resume 
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    // Jobseeker sirf apna resume delete kar sakta hai
    if (
      req.user.role === "jobseeker" &&
      resume.candidateId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own resume"
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully"
    });

  } catch (error) {
    console.log("DELETE RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

    // Jobseeker sirf apna resume update kar sakta hai
    if (
      req.user.role === "jobseeker" &&
      resume.candidateId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own resume"
      });
    }

    const { skills, experience, education } = req.body;

    resume.skills = skills;
    resume.experience = experience;
    resume.education = education;

    // Agar new PDF/file upload hui hai tabhi file change karo
    if (req.file) {
      resume.resumeFile = req.file.filename;
    }

    await resume.save();

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume
    });

  } catch (error) {
    console.log("UPDATE RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
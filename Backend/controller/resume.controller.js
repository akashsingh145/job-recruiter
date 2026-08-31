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

export const deleteResume = async (req,res) =>{
    try{
        const deleteResume = await Resume.findByIdAndDelete(req.params.id)
        if(!deleteResume){
            res.status(404).json({
                success:false,
                message:"Resume not found"
            })
        }
         res.status(200).json({
                success:true,
                message:"Resume deleted successfully"
            })
        

    } catch(error){
        res.status(500).json({success:false,message:error.message})

    }
}

// export const uploadResume = async (req, res) => {
//   console.log(req.user);

//   try {
//     const { skills, experience, education } = req.body;

//     const resumeFile = req.file ? req.file.filename : "";

//     const existing = await Resume.findOne({
//       candidateId: req.user._id,
//     });

//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "Resume already exists",
//       });
//     }

//     const resume = new Resume({
//       candidateId: req.user._id,
//       candidateName: req.user.username,
//       skill: skills,
//       experience,
//       education,
//       resumeFile,
//     });

//     await resume.save();

//     res.status(201).json({
//       success: true,
//       message: "Resume uploaded successfully",
//       resume,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



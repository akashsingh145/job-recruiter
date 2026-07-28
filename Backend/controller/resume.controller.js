import Resume from "../model/Resume. model.js"

export const uploadResume =async(req,res) =>{
    console.log(req.user);
    try{ 
        const{candidateName,skill,experience, education, resumeFile} =req.body

   
const exiting = await Resume.findOne({candidateName})
 if(exiting){
   return res.status (200).json({message:"resume already exist"})
 }

//  create resume
const resume = new Resume({
    candidateName,
    skill,
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
        const resume = await Resume.find();
        res.status(200).json ({success:true,resume })
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



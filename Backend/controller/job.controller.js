import Job from "../model/jobs.model.js"

export const createJob =async (req,res) =>{
    try{
        const{tittle,description,requirements,location,salary,experience,skill} = req.body
     const job  = new Job({
        tittle,
        description,
        salary,
        location,
        requirements

     }) 
     await job.save()
     res.status(200).json({success:true,message:"job created successfully",job})
     

    }catch(error){
        res.status(500).json({message:"something went wrong",error:error.message})
    }
}
// get all jobs
 export const getAllJob =async(req,res)=>{
    try{
         const job = await Job.find()
         res.status(200).json({success:true,job})
    } catch(error){
        res.status(404).json({success:false})
    }
}
//    get job by id
export const getJobById =async(req,res)=>{
    try{
        const getJob =await Job.findById(req.params.id)
        if(!getJob){
            res.status(404).json({
               message:"job not found",
               success:false,

            })
        }
        res.status(200).json({
            success:true,
            getJob
        
        })
        
    }catch(error){
        res.status(404).json({message:"something went wrong",error:error.message})
    }
}

// update job
export const updateJob =async (req,res )=>{
    try{
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        if(!job){
            res.status(400).json({
                success:false,
                message:"job not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"job update successfully"
        })

    } catch(error){
        res.status(400).json({
            message:error.message,
            success:false
            
        })

    }
}
    // delete job
    export const deleteJob =async(req,res) =>{
        try{
            const job =await Job.findByIdAndDelete(req.params.id);
            if(!job){
                res.status(400).json({
                    success:false,
                    message:"job not found"
                })

            }

    res.status(200).json({
        success:true,
        message:"job delete successfully"
    })
        }catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            })

        }
    }


 

import Joining from "../Model/joining.model.js";
import User from "../Model/user.model.js";


// Create Joining
export const createJoining = async (req, res) => {
    try {
        const {
            candidateId,
            joiningDate,
            joiningLocation,
            department,
            designation,
            status
        } = req.body;


        // check candidate exists
        const candidate = await User.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }


        const joining = new Joining({
            candidateId,
            joiningDate,
            joiningLocation,
            department,
            designation,
            status
        });


        await joining.save();


        res.status(201).json({
            message: "Joining created successfully",
            joining
        });


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};



// Get all joining details
export const getAllJoining = async (req, res) => {
    try {

        const joining = await Joining.find()
            .populate("candidateId", "username email phone");


        res.status(200).json({
            joining
        });


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};



// Get single joining
export const getJoiningById = async (req, res) => {
    try {

        const joining = await Joining.findById(req.params.id)
            .populate("candidateId");


        if (!joining) {
            return res.status(404).json({
                message: "Joining not found"
            });
        }


        res.status(200).json({
            joining
        });


    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};



// Update Joining Status
export const updateJoining = async (req, res) => {
    try {

        const joining = await Joining.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!joining) {
            return res.status(404).json({
                message: "Joining not found"
            });
        }


        res.status(200).json({
            message:"Joining updated successfully",
            joining
        });


    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        });
    }
};



// Delete Joining
export const deleteJoining = async(req,res)=>{
    try{

        const joining = await Joining.findByIdAndDelete(req.params.id);


        if(!joining){
            return res.status(404).json({
                message:"Joining not found"
            });
        }


        res.status(200).json({
            message:"Joining deleted successfully"
        });


    }catch(error){
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        });
    }
};

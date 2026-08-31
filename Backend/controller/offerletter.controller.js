
import OfferLetter from "../Model/offerletter.model.js";
import User from "../Model/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";

// CREATE OFFER LETTER
export const createOfferletter = async (req, res) => {
  try {
    const {
      applicationId,
      candidateId,
      companyName,
      jobId,
      designation,
      salary,
      joiningDate,
      status
    } = req.body;

    // Check PDF file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Offer letter PDF is required"
      });
    }

    // Find candidate
    const user = await User.findById(candidateId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    // Create offer letter
    const offerletter = new OfferLetter({
      applicationId,
      candidateId,
      jobId,
      companyName,
      designation,
      salary,
      joiningDate,
      status
    });

    await offerletter.save();

    // Send email with PDF attachment
    await sendEmail(
      user.email,
      "Offer Letter",
      `
        <h2>Congratulations ${user.username}</h2>

        <p>Your offer letter has been generated successfully.</p>

        <p><b>Company:</b> ${companyName}</p>
        <p><b>Designation:</b> ${designation}</p>
        <p><b>Salary:</b> ₹${salary}</p>
        <p><b>Joining Date:</b> ${joiningDate}</p>

        <br>

        <p>Please find your offer letter PDF attached with this email.</p>

        <p>Regards,<br>HR Team</p>
      `,
      [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ]
    );

    res.status(200).json({
      success: true,
      message: "Offer letter created and sent successfully",
      offerletter
    });

  } catch (error) {
    console.log("Create Offer Letter Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// GET ALL OFFER LETTER
export const getAllOfferLetter = async (req, res) => {
  try {
     console.log("GET ALL OFFER LETTER API HIT");
    const offerletter = await OfferLetter.find()
      .populate("jobId")
      .populate("applicationId")
      .populate("candidateId");
     console.log("ALL OFFER LETTERS:", offerletter);
    res.status(200).json({
      success: true,
      offerletter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// GET OFFER LETTER BY ID
export const getOfferLetterById = async (req, res) => {
  try {
    const offerLetter = await OfferLetter.findById(req.params.id);

    if (!offerLetter) {
      return res.status(400).json({
        success: false,
        message: "Offer letter not found"
      });
    }

    res.status(200).json({
      success: true,
      offerLetter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// GET MY OFFER LETTER
export const getMyOfferletter = async (req, res) => {
  try {
      
    const offerletter = await OfferLetter.find({
      candidateId: req.user._id
    })
      .populate("candidateId")
      .populate("jobId")
      .populate("applicationId");
      

    res.status(200).json({
      success: true,
      offerletter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE OFFER LETTER
export const updateOfferLetter = async (req, res) => {
  try {
    const offerLetter = await OfferLetter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!offerLetter) {
      return res.status(400).json({
        success: false,
        message: "Offer letter not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer letter updated successfully",
      offerLetter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ACCEPT OFFER LETTER
export const acceptedOfferLetter = async (req, res) => {
  try {
    const offerLetter = await OfferLetter.findByIdAndUpdate(
      req.params.id,
      {
        status: "accept"
      },
      {
        new: true
      }
    );

    if (!offerLetter) {
      return res.status(400).json({
        success: false,
        message: "Offer letter not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer letter accepted",
      offerLetter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// REJECT OFFER LETTER
export const rejectOfferLetter = async (req, res) => {
  try {
    const offerLetter = await OfferLetter.findByIdAndUpdate(
      req.params.id,
      {
        status: "reject"
      },
      {
        new: true
      }
    );

    if (!offerLetter) {
      return res.status(400).json({
        success: false,
        message: "Offer letter not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer letter rejected",
      offerLetter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE OFFER LETTER
export const deleteOfferLetter = async (req, res) => {
  try {
    const offerLetter = await OfferLetter.findByIdAndDelete(
      req.params.id
    );

    if (!offerLetter) {
      return res.status(400).json({
        success: false,
        message: "Offer letter not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Offer letter deleted successfully",
      offerLetter
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
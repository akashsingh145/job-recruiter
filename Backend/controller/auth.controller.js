import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../Model/resume.model.js"
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req,res) =>{
    try{ 
       const {username,email,password,confirmPassword,role,phone}= req.body;
       
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match"
      });
    }

    // exiting user 
//     console.log(req.body);
// console.log(email);

     const existingUser = await User.findOne({email})
//      console.log(req.body);
// console.log(email);

     if(existingUser){
        return res.status(400).json({message:"user already exists"})
     }
    
    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = new User({
        username,
        email,
        password:hashedPassword,
        role,
        phone
    })
    await user.save()
    res.status(201).json({message:"Registration successful",user:user})
}
catch (error) {
    res.status(500).json({message:"something went wrong",error :error.message})
}
}


// login page
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        );

        // Success Response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};


// profile
 export const getProfile =async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password")
        // resume
        const resume = await Resume.findOne({
      candidateId: req.user.id,
    });

        res.status(200).json ({success:true,user,resume})

    } catch(error){
         console.error("PROFILE ERROR:", error);
        res.status(500).json({success:false,message:error.message})
    }
 };

 export const getAllUsers = async(req,res) => {
    try{
       const users= await User.find().select("-password");
       res.status(200).json({
        success:true,
        users
       });
    }catch(error){
console.log("GET ALL USER ERROR:",error)
res.status(500).json({
    success:false,
    message:error.message
});
    }

 };

 export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("DELETE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forget password
export const forgetPassword = async(req,res)=>{
    try{
 const{email}=req.body
 if(!email){
    return res.status(400).json({
        success:false,
        message:"email not found"
    })
 }
 const user = await User.findOne({email:email})
 if(!user){
    return res.status(400).json({
        success:false,
        message:"user not found"
    });
 }
// generate  reset token
const resetToken =crypto.randomBytes(32).toString("hex");
// save and expire token
user.resetPasswordToken =resetToken
user.resetPasswordExpire =  Date.now() + 15 * 60 * 1000; // 15 minutes
 await user.save();

console.log("TOKEN SAVED:", user.resetPasswordToken);
console.log("TOKEN EXPIRE:", user.resetPasswordExpire);
  const resetLink = `https://wgl1jx1d-5173.inc1.devtunnels.ms/reset-password/${resetToken}`;

        const emailMessage = `
            <h2>Password Reset Request</h2>

            <p>Hello ${user.username},</p>

            <p>You requested to reset your password.</p>

            <p>Click the button below to reset your password:</p>

            <a href="${resetLink}"
               style="
                 display:inline-block;
                 padding:10px 20px;
                 background:#2563eb;
                 color:white;
                 text-decoration:none;
                 border-radius:5px;
               ">
                Reset Password
            </a>

            <p>This link will expire in 15 minutes.</p>

            <p>If you did not request this, you can ignore this email.</p>
        `;

        await sendEmail(
            user.email,
            "Job Recurator - Reset Password",
            emailMessage
        );

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });

    }
    catch(error){
     res.status(400).json({
        success:false,
        messge:"Password do not reset"
     })
    }
}

// reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        console.log("TOKEN FROM URL:", token);

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Reset token is missing"
            });
        }

        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            });
        }

        // First find user only by token
        const user = await User.findOne({
            resetPasswordToken: token
        });

        console.log("USER BY TOKEN:", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid reset token"
            });
        }

        console.log("TOKEN EXPIRE:", user.resetPasswordExpire);
        console.log("CURRENT TIME:", new Date());

        // Check expiry
        if (
            !user.resetPasswordExpire ||
            new Date(user.resetPasswordExpire) <= new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "Reset token expired"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log("RESET PASSWORD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
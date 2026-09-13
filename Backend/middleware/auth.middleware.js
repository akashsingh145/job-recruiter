// console.log("Auth Middleware ");

import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";
const authMiddleware = async(req,res,next)=>{
    
    
    try{
        const  token =req.headers.authorization;
        
        if(!token){
            return res.status(400).json({message:"user not found"})
        }
        
        // find actual token
        const acutualToken = token.split(" ")[1]
        
        // token verify
        const decodeToken = jwt.verify(
            acutualToken,
            process.env.JWT_SECRET
        );
        console.log(decodeToken)
        // user find
        // console.log("Decoded Token:", decodeToken);
        const user = await User.findById(decodeToken.id)
        // console.log("Decoded Token:", decodeToken);
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        req.user =user;
        console.log("User Role:", req.user.role);
        next();
         
   
    }catch(error){
res.status(400).json({message:"unvalid token",error:error.message})
    }
} 
export default authMiddleware;




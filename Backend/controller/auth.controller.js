import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req,res) =>{
    try{ 
       const {username,email,password,role,phone}= req.body;
       

    // exiting user 
    console.log(req.body);
console.log(email);

     const existingUser = await User.findOne({email})
     console.log(req.body);
console.log(email);

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

// export const login = async (req,res) =>{
//     try{
//         const {email,password}= req.body
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(404).json({message:"user not found " })
//         }
//         // compare password
//         const isMatch = await bcrypt.compare (password,user.password )
//         if(!isMatch){
//             return res.status(400).json({ success:false,message:"invalid password"});
//             const token = jwt.sign ({ id: user._id },process .env.JWT_SECRET, {expiresIn:"5d"})
// res.status(200).json({success:true,message:"login successfully" ,token ,user:user})



//     res.status(500).json ({success:false,message:"something went wrong"})
// };

//         }

    
//     catch(error){
//         res.status(500).json({message:"something went wrong",error:error.message})
//     }
// }

// token
// const token = jwt.sign ({ id: user._id },process .env.JWT_SECRET, {expiresIn:"5d"})
// res.status(200).json({success:true,message:"login successfully" ,token ,user:user})



//     res.status(500).json ({success:false,message:"something went wrong"})
// };

// profile
 export const profile =async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password")
        res.status(200).json ({success:true,user:user})
    } catch(error){
        res.status(500).json({success:false,message:error.message})
    }
 };
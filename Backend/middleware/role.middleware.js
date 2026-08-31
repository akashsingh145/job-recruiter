// const roleMiddleware =(...role) =>{
//     return(req,res,next)=>{
//         if(!req.user){
//             return res.status(400).json({
//                 message:"unauthorized"
//             })
//         }
//         if(!roles.includes(req.user.role)){
//             return res.status(400).json({
//                 message:"access denied"
//             })
//         }


//     };
// };
// export default roleMiddleware


// new
const roleMiddleware = (...roles) => {
  return (req, res, next) => {
     console.log("Allowed Roles:", roles);
    console.log("User Role:", req.user.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};

export default roleMiddleware;
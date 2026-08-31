import express from "express"
import { register,login,getProfile,getAllUsers, deleteUser,forgetPassword,resetPassword} from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
const router =express.Router();
router.route('/register').post(register)
router.post("/login",login)
router.get("/profile",authMiddleware,roleMiddleware("jobseeker","admin","interviewer") ,getProfile)
router.get ("/all",authMiddleware,roleMiddleware("admin"),getAllUsers)
router.delete("/:id",authMiddleware,roleMiddleware("admin"),deleteUser)
router.post("/forgot-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
export default router
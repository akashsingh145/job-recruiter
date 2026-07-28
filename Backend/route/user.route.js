import express from "express"
import { register,login,profile } from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
const router =express.Router();
router.route('/register').post(register)
router.post("/login",login)
router.get("/profile",authMiddleware,roleMiddleware("user","admin","interviewer") ,profile)
export default router
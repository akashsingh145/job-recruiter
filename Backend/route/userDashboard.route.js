import express from "express"
import { getUserDashboard } from "../controller/userDashboard.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js"
const router= express.Router();
router.get("/", authMiddleware,roleMiddleware("jobseeker"),getUserDashboard)
export default router;
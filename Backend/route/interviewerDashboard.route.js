import express from "express"
import { interviwerDashboard } from "../controller/interviewerDashboard.js"
import authMiddleware from "../middleware/auth.middleware.js"
import roleMiddleware from "../middleware/role.middleware.js"
const router = express.Router();
router.get("/",authMiddleware,roleMiddleware("interviewer"),interviwerDashboard)
export default router;
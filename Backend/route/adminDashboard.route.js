import express from "express"
import { adminDashboard } from "../controller/adminDashboard.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
const router = express.Router();
router.get("/",authMiddleware,roleMiddleware("admin"),adminDashboard)
export default router;

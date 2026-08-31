import express from "express"
import{createJob ,getAllJob,getJobById,updateJob,deleteJob}from "../controller/job.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js"
const router = express.Router();
router.post("/create",authMiddleware,roleMiddleware("admin","interviewer") ,createJob)
router.get("/", getAllJob)
router.get("/:id",getJobById)
router.put("/:id",authMiddleware, roleMiddleware("admin","interviewer"),updateJob)
router.delete("/:id",authMiddleware,roleMiddleware("admin","interviewer"),deleteJob)
export default router
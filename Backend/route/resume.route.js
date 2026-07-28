import express from "express"
import{uploadResume,getAllResume,getResumeById,deleteResume} from "../controller/resume.controller.js"
const router =express.Router();
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js"
router.post("/upload", authMiddleware, roleMiddleware("jobseeker"),upload.single("resumeFile"),uploadResume)
router.get("/",authMiddleware,roleMiddleware("admin","interviewer"),getAllResume)
router.get("/:id",authMiddleware,roleMiddleware("admin","interviewer","jobseeker"),getResumeById)
router.delete("/:id",authMiddleware,roleMiddleware("admin"),deleteResume)

export default router
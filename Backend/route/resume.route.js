import express from "express"
import{uploadResume,getAllResume,getResumeById,deleteResume,getMyResume,updateResume} from "../controller/resume.controller.js"
const router =express.Router();
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js"
router.post("/upload", authMiddleware, roleMiddleware("jobseeker"),upload.single("resumeFile"),uploadResume)
router.get("/",authMiddleware,roleMiddleware("admin","interviewer"),getAllResume)
router.get("/my",authMiddleware,roleMiddleware("jobseeker"),getMyResume)
router.get("/:id",authMiddleware,roleMiddleware("admin","interviewer","jobseeker"),getResumeById)
router.put("/:id",authMiddleware,roleMiddleware("jobseeker"),updateResume)
router.delete("/:id",authMiddleware,roleMiddleware("admin","jobseeker"),deleteResume)

export default router
import express from "express"
import{scheduleInterview,getAllInterview,getInterViewById,updateInterview,deleteInterview} from "../controller/interview.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js"
const router =express.Router(); 
router.post("/schedule", authMiddleware,roleMiddleware ("admin","interviwer") ,scheduleInterview)
router.get("/", authMiddleware,roleMiddleware("admin","interviewer") ,getAllInterview)
router.get("/:id", authMiddleware, roleMiddleware("admin","interviewer"),getInterViewById)
router.put("/:id",authMiddleware, roleMiddleware("admin","interviwer"),updateInterview)
router.delete("/:id",authMiddleware, roleMiddleware("admin","interviewer"),deleteInterview)
export default router
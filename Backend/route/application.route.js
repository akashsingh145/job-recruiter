import express from "express"
import { applyJob,getAllApplication,getApplicationById,updateApplication,deleteApplication } from "../controller/application.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
const router =express.Router();
router.post("/apply", authMiddleware,roleMiddleware("user"),applyJob)
router.get("/",authMiddleware,roleMiddleware("admin","interviewer"),getAllApplication)
router.get("/:id",authMiddleware,roleMiddleware("admin","interviewer"),getApplicationById)
router.put("/:id",authMiddleware,roleMiddleware("admin","interviewer"),updateApplication)
router.delete("/:id",authMiddleware,roleMiddleware("admin"),deleteApplication)
export default router

import express from "express"
import{scheduleInterview,getAllInterview,getInterViewById,getMyInterview,updateInterview,deleteInterview} from "../controller/interview.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js"
const router =express.Router(); 

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Interview route working"
  });
});
router.post("/create", authMiddleware,roleMiddleware("admin","interviewer") ,scheduleInterview)
router.get(
  "/my",
  authMiddleware,
  getMyInterview
);
router.get("/", authMiddleware,roleMiddleware("admin","interviewer") ,getAllInterview)
router.get("/:id", authMiddleware, roleMiddleware("admin","interviewer","jobseeker"),getInterViewById)
router.put("/:id",authMiddleware, roleMiddleware("admin","interviewer"),updateInterview)
router.delete("/:id",authMiddleware, roleMiddleware("admin","interviewer"),deleteInterview)
export default router
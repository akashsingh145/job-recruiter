import express from "express";
import {
    createJoining,
    getAllJoining,
    getJoiningById,
    updateJoining,
    deleteJoining
} from "../controller/joining.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();


router.post("/create",  authMiddleware,roleMiddleware("admin","interviewer"),createJoining);

router.get("/",authMiddleware, roleMiddleware("admin","interviewer"), getAllJoining);

router.get("/:id",authMiddleware, roleMiddleware("admin","user","interviewer"), getJoiningById);

router.put("/:id",authMiddleware, roleMiddleware("admin","interviewer"),updateJoining);

router.delete("/:id",authMiddleware, roleMiddleware("admin","interviewer"),deleteJoining);


export default router;
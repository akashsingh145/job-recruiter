import  express from "express"
import{
    createOfferletter,
    getAllOfferLetter,
    getOfferLetterById,
    updateOfferLetter,
    acceptedOfferLetter,
     rejectOfferLetter,
     deleteOfferLetter} from "../controller/offerletter.controller.js"
     import authMiddleware from "../middleware/auth.middleware.js";
     import roleMiddleware from "../middleware/role.middleware.js";
     import upload from "../middleware/upload.middleware.js";
     const router = express.Router();
     router.post("/", authMiddleware,roleMiddleware("admin","interviewer"),upload.single("offerletter"),createOfferletter)
     router.get("/",authMiddleware,roleMiddleware("admin","interviewer"),getAllOfferLetter)
     router.get("/:id",authMiddleware,roleMiddleware("admin","interviewer"),getOfferLetterById)
     router.put("/:id",authMiddleware, roleMiddleware("admin","interviewer"),updateOfferLetter)
     router.put("/accepted/:id", authMiddleware, roleMiddleware("user"),acceptedOfferLetter)
     router.put("/reject/:id", authMiddleware,roleMiddleware("user"),rejectOfferLetter)
     router.delete("/:id",authMiddleware, roleMiddleware("admin"),deleteOfferLetter)
     export default router


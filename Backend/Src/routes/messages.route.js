import Express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages, sendMessages } from "../controllers/Message.controller.js";

const router=Express.Router();

router.get("/users",protectRoute,getAllUsers);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages);
export default router;
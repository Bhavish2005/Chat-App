import express from "express"
import { checkAuth, logout, signin, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();


// next step is defining the Logic in controllers..
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateProfile);
router.get("/check",protectRoute,checkAuth);
export default router;
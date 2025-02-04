import express from "express"
import { logout, signin, signup } from "../controllers/auth.controller.js";

const router=express.Router();
// next step is defining the Logic in controllers..
router.get("/signup",signup);
router.get("/signin",signin);
router.get("/logout",logout);
export default router;
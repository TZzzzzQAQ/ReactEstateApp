import express from "express";
import {authSignIn, authSignUp,authGoogleSignIn} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", authSignUp);
router.post("/signin", authSignIn);
router.post("/google", authGoogleSignIn);

export default router;
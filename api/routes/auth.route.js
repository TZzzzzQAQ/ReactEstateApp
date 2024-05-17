import express from "express";
import {authSignIn, authSignUp} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", authSignUp)
router.post("/signin", authSignIn);

export default router;
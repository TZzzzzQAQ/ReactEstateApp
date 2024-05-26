import express from "express";
import {updateUser} from "../controllers/user.controller.js";
import {verifyToken} from "../middleWare/verifyUser.middleware.js";

const user = express.Router();
user.post('/update/:id', verifyToken, updateUser);
export default user;
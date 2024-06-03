import express from "express";
import {deleteUser, updateUser} from "../controllers/user.controller.js";
import {verifyToken} from "../middleWare/verifyUser.middleware.js";

const user = express.Router();
user.post('/update/:id', verifyToken, updateUser);
user.delete('/delete/:id', verifyToken, deleteUser);
export default user;
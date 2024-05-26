import {updateUser} from "../Dao/user.dao.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const SALT = parseInt(process.env.SALT);

export const updateUserService = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, SALT);
    const response = await updateUser(userData._id, userData);
    const {password: tempPassword, ...restUser} = response._doc;
    if (restUser) {
        const token = jwt.sign({id: restUser.id}, process.env.SECRET_KEY);
        return {token, restUser};
    } else {
        throw new Error("User does not exist");
    }
}
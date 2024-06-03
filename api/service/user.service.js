import {deleteUserByID, findUserByEmail, updateUser} from "../Dao/user.dao.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const SALT = parseInt(process.env.SALT);

export const updateUserService = async (userData) => {
    const validUser = await findUserByEmail(userData.email);
    if (!validUser) {
        throw new Error('User does not exist');
    }
    const validPassword = bcrypt.compareSync(userData.password, validUser.password);
    if (!validPassword) {
        throw new Error('Wrong Credentials');
    }
    userData.password = await bcrypt.hash(userData.newPassword, SALT);
    delete userData.newPassword;
    const response = await updateUser(userData._id, userData);
    const {password: tempPassword, ...restUser} = response._doc;
    if (restUser) {
        const token = jwt.sign({id: restUser.id}, process.env.SECRET_KEY);
        return {token, restUser};
    } else {
        throw new Error("User does not exist");
    }
}

export const deleteUserService = async (userData) => {
    return await deleteUserByID(userData.id);
}

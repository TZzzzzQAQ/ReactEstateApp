import {createUser, findUserByEmail} from "../Dao/user.dao.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
const SALT = parseInt(process.env.SALT);

export const authService = async (userData) => {
    const {password, tempPassword, ...rest} = userData;

    if (password !== tempPassword) {
        throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, SALT);
    const newUser = {...rest, password: hashedPassword};

    return await createUser(newUser);
}

export const signInService = async (userData) => {
    const {email, password} = userData;

    const validUser = await findUserByEmail(email);
    if (!validUser) {
        throw new Error;
    }

    const validPassword = await bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
        throw new Error;
    }

    const token = jwt.sign({id: validUser.id}, process.env.SECRET_KEY);
    const {password: tempPassword, ...restUser} = validUser._doc;
    return {token, restUser};
}

export const signInWithGoogle = async (userData) => {
    const {email} = userData;
    const user = await findUserByEmail(email);
    if (user) {
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
        const {password: tempPassword, ...restUser} = user._doc;
        return {token, restUser};
    } else {
        const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(password, SALT);
        const newUser = new User({
            name: userData.name.split(' ').join('') + Math.random().toString(36).slice(-4),
            password: hashedPassword,
            email: userData.email,
            avatar: userData.photo
        });
        const response = await createUser(newUser);
        const token = jwt.sign({id: response.id}, process.env.SECRET_KEY);
        const {password: tempPassword, ...restUser} = response._doc;
        return {token, restUser};
    }
}
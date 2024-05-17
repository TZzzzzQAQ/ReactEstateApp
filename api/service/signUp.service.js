import {createUser, findUserByEmail} from "../DAO/auth.dao.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const signUpService = async (userData) => {
    const {password, tempPassword, ...rest} = userData;

    if (password !== tempPassword) {
        throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
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
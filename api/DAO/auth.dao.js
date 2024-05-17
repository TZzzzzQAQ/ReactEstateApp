import User from "../models/user.model.js";

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};
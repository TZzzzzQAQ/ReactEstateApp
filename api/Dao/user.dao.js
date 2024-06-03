import User from "../models/user.model.js";

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const updateUser = async (id, userData) => {
    return User.findOneAndUpdate(
        {_id: id},
        {$set: userData},
        {new: true, runValidators: true}
    );
}

export const findUserByEmail = async (email) => {
    return User.findOne({email});
};

export const deleteUserByID = async (id) => {
    return User.findByIdAndDelete(id);
}
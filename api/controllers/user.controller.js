import {errorHandler} from "../utils/error.js";
import {deleteUserService, updateUserService} from "../service/user.service.js";

export async function updateUser(req, res, next) {
    try {
        const user = req.body;
        if (user._id !== req.params.id) {
            return next(errorHandler(401, "You can only update your own account!"))
        }
        const {token, restUser} = await updateUserService(user);
        res.status(200).cookie('access_token', token).json(restUser);
    } catch (error) {
        next(error)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const user = req.body;
        if (user._id !== req.params.id) {
            return next(errorHandler(401, "You can only delete your own account!"))
        }
        const restUser = await deleteUserService(user);
        res.status(200).json(restUser);
    } catch (error) {

    }
}
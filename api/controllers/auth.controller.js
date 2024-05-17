import {signInService, signUpService} from "../service/signUp.service.js";
import {errorHandler} from "../utils/error.js";


export const authSignUp = async (req, res, next) => {
    try {
        const newUser = await signUpService(req.body);
        const {password: password, ...restUser} = newUser._doc;
        res.status(201).json({message: 'User saved successfully', user: restUser});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const authSignIn = async (req, res, next) => {
    try {
        const {token, restUser} = await signInService(req.body);
        res.status(200).cookie('access_token', token).json(restUser);
    } catch (e) {
        return next(errorHandler(404, 'Wrong credentials'));
    }
}
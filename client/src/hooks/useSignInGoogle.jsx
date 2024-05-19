import {useState} from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {firebaseApp} from "../../fireabase.js";
import {signInGoogleAPI} from "@/api/signAPI.jsx";

export const useSignInGoogle = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchGoogleUsers = async () => {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage('');
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(firebaseApp);
            const result = await signInWithPopup(auth, provider);
            const response = await signInGoogleAPI({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            });
            setIsSuccess(true);
            return response;
        } catch (e) {
            setIsError(true);
            setErrorMessage(e.message)
        } finally {
            setIsLoading(false);
        }
    }
    return {isLoading, isError, isSuccess, errorMessage, fetchGoogleUsers};
}
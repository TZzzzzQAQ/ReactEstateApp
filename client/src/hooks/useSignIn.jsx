import {useState} from "react";
import {signInAPI} from "@/api/signAPI.jsx";

export function useSignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const fetchSignIn = async (data) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        try {
            const response = await signInAPI(data);
            setIsSuccess(true);
            return response;
        } catch (e) {
            setIsError(true);
            setErrorMessage(e.response.data.message)
            throw e;
        } finally {
            setIsLoading(false);
        }
    }
    return {isLoading, isError, isSuccess, errorMessage, fetchSignIn};
}

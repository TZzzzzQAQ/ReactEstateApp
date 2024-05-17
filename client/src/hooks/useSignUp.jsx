import {useState} from "react";
import {signUpAPI} from "@/api/signAPI.jsx";

export function useSignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)

    const fetchSignUp = async (data) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        try {
            const response = await signUpAPI(data);
            setIsSuccess(true);
            return response;
        } catch (e) {
            setIsError(true)
            throw e;
        } finally {
            setIsLoading(false);
        }
    }
    return {isLoading, isError, isSuccess, fetchSignUp};
}

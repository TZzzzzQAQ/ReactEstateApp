import {useState} from "react";
import {userUpdateAPI} from "@/api/userAPI.jsx";

export function useUserUpdate() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const fetchUserUpdate = async (id, data) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        try {
            const response = await userUpdateAPI(id, data);
            setIsSuccess(true);
            return response;
        } catch (e) {
            setIsError(true);
            setErrorMessage(e.response.data.message);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }
    return {errorMessage,isLoading, isError, isSuccess, fetchUserUpdate};
}
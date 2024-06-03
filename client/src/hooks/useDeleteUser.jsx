import {useState} from "react";
import {userDeleteAPI} from "@/api/userAPI.jsx";

export function useDeleteUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchDeleteUser = async (id, data) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        setErrorMessage('');

        try {
            const response = await userDeleteAPI(id, data);
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
    return {errorMessage, isLoading, isError, isSuccess, fetchDeleteUser};
}
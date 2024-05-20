import {useSignInGoogle} from "@/hooks/useSignInGoogle.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/feature/userSlice.jsx";


const GoogleAuth = () => {
    const {isError, isLoading, errorMessage, fetchGoogleUsers} = useSignInGoogle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginInWithGoogle = async () => {
        try {
            const response = await fetchGoogleUsers();
            dispatch(setUser(response));
            navigate('/', {replace: true});
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <button
                disabled={isLoading}
                className={'text-white rounded-lg p-2 max-w-lg w-96 uppercase bg-cyan-700 hover:bg-cyan-900 font-extrabold mt-4'}
                onClick={loginInWithGoogle}>
                {isLoading ? "Signing Up......" : "Continue with Google Account"}
            </button>
            {isError && <p className={'text-red-500 font-extrabold'}>{errorMessage}</p>}
        </>
    )
        ;
};

export default GoogleAuth;
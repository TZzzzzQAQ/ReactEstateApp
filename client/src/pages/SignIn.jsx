import {useState} from 'react';
import Header from "@/components/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useSignIn} from "@/hooks/useSignIn.jsx";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/feature/userSlice.jsx";
import GoogleAuth from "@/components/GoogleAuth.jsx";

const SignUp = () => {
    const {isError, isLoading, errorMessage, isSuccess, fetchSignIn} = useSignIn();
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handlerChange = (e) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }
    const handlerSubmit = async (e) => {
        e.preventDefault();
        const response = fetchSignIn(formData);
        console.log(response)
        dispatch(setUser(response))
        navigate("/", {replace: true})
    }
    return (
        <div>
            <Header/>
            <div className={'flex flex-col items-center justify-center mt-8 max-w-lg mx-auto'} onSubmit={handlerSubmit}>
                <h1 className={'text-3xl font-extrabold'}>Sign In</h1>
                <form className={'flex flex-col items-center justify-center mt-8 gap-4'}>
                    <input onChange={handlerChange} type={'email'} placeholder={'email'}
                           className={'rounded-lg p-2 max-w-lg w-96'}
                           id={'email'}/>
                    <input onChange={handlerChange} type={'password'} placeholder={'password'}
                           className={'rounded-lg p-2 max-w-lg w-96'}
                           id={'password'}/>
                    <button
                        disabled={isLoading}
                        className={'text-white rounded-lg p-2 max-w-lg w-96 uppercase bg-cyan-700 hover:bg-cyan-900 font-extrabold'}>
                        {isLoading ? "Signing Up......" : "Sign Up"}
                    </button>
                </form>
                <GoogleAuth/>
                <div className={'font-extrabold'}>
                    Do not have an account? <Link className={'text-blue-400 font-extrabold'} to={'/sign-up'}>Sign
                    up</Link>
                </div>
                {isError && <p className={'text-red-500 font-extrabold'}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default SignUp;
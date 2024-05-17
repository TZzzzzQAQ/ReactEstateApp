import {useState} from 'react';
import Header from "@/components/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useSignUp} from "@/hooks/useSignUp.jsx";

const SignUp = () => {
    const {isError, isLoading, isSuccess, fetchSignUp} = useSignUp();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        tempPassword: '',
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
        fetchSignUp(formData).then(() => {
            navigate("/sign-in", {replace: true})
        })

    }
    return (
        <div>
            <Header/>
            <div className={'flex flex-col items-center justify-center mt-8 max-w-lg mx-auto'} onSubmit={handlerSubmit}>
                <h1 className={'text-3xl font-extrabold'}>Sign Up</h1>
                <form className={'flex flex-col items-center justify-center mt-8 gap-4'}>
                    <input onChange={handlerChange} type={'text'} placeholder={'name'}
                           className={'rounded-lg p-2 max-w-lg w-96'} id={'name'}/>
                    <input onChange={handlerChange} type={'email'} placeholder={'email'}
                           className={'rounded-lg p-2 max-w-lg w-96'}
                           id={'email'}/>
                    <input onChange={handlerChange} type={'password'} placeholder={'password'}
                           className={'rounded-lg p-2 max-w-lg w-96'}
                           id={'password'}/>
                    <input onChange={handlerChange} type={'password'} placeholder={'double-check your password'}
                           className={'rounded-lg p-2 max-w-lg w-96'}
                           id={'tempPassword'}/>
                    <button
                        disabled={isLoading}
                        className={'text-white rounded-lg p-2 max-w-lg w-96 uppercase bg-cyan-700 hover:bg-cyan-900 font-extrabold'}>
                        {isLoading ? "Signing Up......" : "Sign Up"}
                    </button>
                </form>
                <div>
                    Have an account? <Link className={'text-blue-400 font-extrabold'} to={'/sign-in'}>Sign in</Link>
                </div>
                {isError && <p>Sign up failed. Please try again.</p>}
                {isSuccess && <p>Sign up successfully. </p>}
            </div>
        </div>
    );
};

export default SignUp;
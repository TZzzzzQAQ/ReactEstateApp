import React from 'react';
import {FaSearch} from 'react-icons/fa'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    const linkHandler = (event) => {
        navigate(event.currentTarget.getAttribute('name'));
    }
    return (
        <header className={'flex items-center justify-between bg-cyan-200 p-3 shadow-lg px-24 font-extrabold'}>
            <div className={'flex flex-wrap text-2xl cursor-pointer'} onClick={linkHandler} name={'/'}>
                <h1 className={'text-cyan-700 mx-1'}>TZQ</h1>
                <h1 className={'text-cyan-500'}>Estate</h1>
            </div>
            <form className={'flex items-center justify-center'}>
                <input type={'search'} className={'w-32 sm:w-80 rounded-xl p-3 mx-2 focus:outline-none ml-20'}
                       placeholder={'Search...'}/>
                <FaSearch className={'size-5 right-4'}/>
            </form>
            <ul className={'flex items-center justify-between gap-4 text-xl'}>
                <li className={'hidden sm:inline text-cyan-500 hover:text-cyan-700 cursor-pointer hover:underline'}
                    onClick={linkHandler} name={'/'}>
                    Home
                </li>
                <li className={'hidden sm:inline text-cyan-500 hover:text-cyan-700 cursor-pointer hover:underline'}
                    onClick={linkHandler} name={'/about'}>
                    About
                </li>
                {user?.hasOwnProperty('avatar') ?
                    <img src={user.avatar} alt={''} className={'rounded-full w-10 h-10 cursor-pointer'}
                         onClick={() => navigate('/profile')}/> :
                    <li className={'text-cyan-500 hover:text-cyan-700 cursor-pointer hover:underline'}
                onClick={linkHandler} name={'/sign-in'}>
                Sign In
            </li>
            }
        </ul>
</header>
)
    ;
};

export default Header;
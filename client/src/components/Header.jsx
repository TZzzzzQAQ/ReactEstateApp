import React from 'react';
import {FaSearch} from 'react-icons/fa'

const Header = () => {
    return (
        <header className={'flex items-center justify-between bg-cyan-200 p-3 shadow-lg px-24 gap-4'}>
            <div className={'flex flex-wrap text-2xl font-bold'}>
                <h1 className={'text-cyan-700 mx-1'}>TZQ</h1>
                <h1 className={'text-cyan-500'}>Estate</h1>
            </div>
            <form className={'flex items-center'}>
                <input type={'search'} className={'w-32 sm:w-80 rounded-xl p-3 mx-2 focus:outline-none'}
                       placeholder={'Search...'}/>
                <FaSearch className={'size-5'}/>
            </form>
            <ul className={'flex items-center justify-between gap-4'}>
                <li className={'hidden sm:inline text-cyan-500 hover:text-cyan-700 cursor-pointer hover:underline'}>
                    Home
                </li>
                <li className={'hidden sm:inline text-cyan-500 hover:text-cyan-700 cursor-pointer hover:underline'}>
                    About
                </li>
                <li className={'text-cyan-500 hover:text-cyan-700 cursor-pointer hover:underline'}>
                    Sign In
                </li>
            </ul>
        </header>
    );
};

export default Header;
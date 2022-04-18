import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function SignUpForm() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email && password) {
            signup(email, password)
                .then(() => navigate('/dashboard'));
        } else {
            console.log('Empty field');
        }

    }

    return (
        <div className=' bg-white p-9 rounded-2xl space-y-10 shadow-xl'>
            <div className='space-y-7'>
                <div className='space-y-1'>
                    <label htmlFor="email" className='block text-md font-semibold text-gray-600'>Email</label>
                    <input ref={emailRef} type="text" name="email" className='w-full outline-none border-2 border-gray-300 focus:border-blue-400 rounded-md p-2 shadow-sm' />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="password" className='block text-md font-semibold text-gray-600'>Password</label>
                    <input ref={passwordRef} type="password" name="password" className='w-full outline-none border-2 border-gray-300 focus:border-blue-400 rounded-md p-2 shadow-sm' />
                </div>
                <div className='flex flex-col items-center justify-start lg:flex-row'>
                    <div className='flex items-center'>
                        <input type="checkbox" id='remember-me' name="remember-me" className=' h-4 w-4 outline-none text-blue-500 focus:ring-blue-600 focus:ring ring-offset-2 border-gray-300 rounded' />
                        <label htmlFor="remember-me" className='ml-2 block text-md text-gray-900'> Remember me </label>
                    </div>

                </div>
                <button onClick={handleSignUp}
                    className='transition-colors duration-100 w-full outline-none font-medium bg-blue-600
                     hover:bg-blue-500 focus:bg-blue-500 py-2 rounded-md 
                     text-white cursor-pointer'>
                    Sign up
                </button>
            </div>
        </div>
    );
}
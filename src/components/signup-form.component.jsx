import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function SignUpForm() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const { signup } = useAuth();

    const handleSignUp = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setError(null);
        signup(email, password)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                setError(error);
                console.log(error.code);
            });
    }

    return (
        <div className=' bg-white p-9 rounded-2xl space-y-10 shadow-xl'>
            <div className='space-y-4'>
                <div classsName='space-y-1'>
                    <label htmlFor="email" className='after:content-["*"] after:ml-0.5 after:text-red-500 block text-md font-semibold text-gray-600'>Email</label>
                    <input ref={emailRef} type="email" name="email"
                        className='peer w-full outline-none border-2 border-gray-300 
                        rounded-md p-2 shadow-sm invalid:border-red-500' />
                    <label htmlFor="" className="invisible text-red-500 peer-invalid:visible">Email is not valid</label>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="password" className='after:content-["*"] after:ml-0.5 after:text-red-500 block text-md font-semibold text-gray-600'>Password</label>
                    <input ref={passwordRef} type="password" name="password" minLength={6}
                        className='peer w-full outline-none border-2 border-gray-300 invalid:border-red-500
                         rounded-md p-2 shadow-sm' />
                    <label htmlFor="" className="invisible peer-invalid:visible text-red-500">Minimum length required (at least 6 characters)!</label>
                </div>
                <button onClick={handleSignUp} disabled={disabled}
                    className='transition-colors duration-100 w-full outline-none font-medium bg-blue-600
                     hover:bg-blue-500 focus:bg-blue-500 py-2 rounded-md disabled:opacity-75
                     text-white cursor-pointer'>
                    Sign up
                </button>
                <div>
                    {error && error.code === 'auth/email-already-in-use' && <p className="text-red-500">Email has been already in use</p>}
                    {error && error.code === 'auth/weak-password' && <p className="text-red-500">Weak password</p>}
                    {error && error.code === 'auth/invalid-email' && <p className="text-red-500">Invalid email</p>}
                </div>
            </div>
        </div>
    );
}
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function SignInForm() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const auth = useAuth();
    const navigate = useNavigate();

    const handleSignin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email && password) {
            auth.signin(email, password)
                .then(() => navigate('/dashboard'))
                .catch((error) =>
                    console.log(error));
        } else {
            console.log('Empty field');
        }
    }

    const handleSigninWithThirdParty = (party) => {
        auth.signinWithThirdParty(party)
            .then((user) => navigate('/dashboard'))
            .catch((error) => console.log(error))
    }

    return (
        <div className='bg-white p-9 rounded-2xl space-y-10 shadow-xl'>
            <div className='space-y-7'>
                <div className='space-y-1'>
                    <label htmlFor="email" className='block text-md font-semibold text-gray-600'>Email</label>
                    <input ref={emailRef} type="text" name="email"
                        className='w-full outline-none border-2 border-gray-300 focus:border-blue-400 rounded-md p-2 shadow-sm' />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="password" className='block text-md font-semibold text-gray-600'>Password</label>
                    <input ref={passwordRef} type="password" name="password"
                        className='w-full outline-none border-2 border-gray-300 focus:border-blue-400 rounded-md p-2 shadow-sm' />
                </div>
                <div className='flex flex-col items-center justify-between lg:flex-row'>
                    <div className='flex items-center'>
                        <input type="checkbox" id='remember-me' name="remember-me"
                            className=' h-4 w-4 outline-none text-blue-500 focus:ring-blue-600 focus:ring ring-offset-2 border-gray-300 rounded' />
                        <label htmlFor="remember-me" className='ml-2 block text-md text-gray-900'> Remember me </label>
                    </div>

                    <div className='text-sm'>
                        <a href="#" className='font-semibold outline-none text-blue-600 hover:text-blue-400 focus:text-blue-400 focus:decoration-blue-300'>Forgot your password?</a>
                    </div>
                </div>
                <button onClick={handleSignin} className='transition-colors ease-in-out duration-100 w-full outline-none font-medium bg-blue-600
                 hover:bg-blue-500 focus:bg-blue-500 py-2 rounded-md 
                 text-white cursor-pointer'>Sign in</button>
            </div>
            <div className=' text-center space-y-3'>
                <p className=' text-md text-gray-400'>Or continue with</p>
                <div className=' flex items-center gap-3'>
                    <button onClick={() => handleSigninWithThirdParty('google')}
                        className='transition-colors duration-100 group border-2 outline-none
                         border-red-500 hover:bg-red-500 focus:bg-red-500 rounded-lg p-1 basis-1/2'>
                        <i className="fa-brands fa-google text-2xl text-red-500
                         group-hover:text-white group-focus:text-white"></i>
                    </button>

                    <button onClick={() => handleSigninWithThirdParty('github')}
                        className='transition-colors duration-100 group border-2 outline-none
                         border-black hover:bg-black focus:bg-black rounded-lg p-1 basis-1/2'>
                        <i className="fa-brands fa-github text-2xl text-black
                         group-hover:text-white group-focus:text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
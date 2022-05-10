import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from 'react-router-dom';

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
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <label htmlFor="email" className='after:content-["*"] after:ml-0.5 after:text-red-500 block text-md font-semibold text-gray-600'>Email</label>
                    <input ref={emailRef} type="email" name="email"
                        className='peer w-full outline-none border-2 border-gray-300 
                        rounded-md p-2 shadow-sm invalid:border-red-500' />
                    <label className="invisible text-red-500 peer-invalid:visible">Email is not valid</label>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="password" className='after:content-["*"] after:ml-0.5 after:text-red-500 block text-md font-semibold text-gray-600'>Password</label>
                    <input ref={passwordRef} type="password" name="password" required
                        className='w-full outline-none border-2 border-gray-300 focus:border-blue-400 rounded-md p-2 
                            shadow-sm' />
                </div>
                <div className='flex flex-col items-center justify-end lg:flex-row'>
                    <div>
                        <Link to="/forgot" className="transition-colors delay-75 font-medium 
                        outline-none text-blue-600 hover:text-blue-400">Forgot your password?</Link>
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
                         border-red-500 hover:bg-red-500 focus:bg-red-500 rounded-lg p-1 grow'>
                        <i className="fa-brands fa-google text-2xl text-red-500
                         group-hover:text-white group-focus:text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
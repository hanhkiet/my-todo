/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import SignInForm from '../components/signin-form.component';
import SignUpForm from '../components/signup-form.component';
import { useAuth } from '../hooks/useAuth';

export default function Register({ action }) {

    const auth = useAuth();
    const [error, setError] = useState(null);

    console.log(auth);

    if (auth !== null && auth.user !== false) {
        return <Navigate to='/dashboard' replace />
    }

    return (
        <div className='h-screen w-screen bg-gray-100 flex justify-center items-center'>
            <div className=' basis-1/3 space-y-10 p-4'>
                <div className=' text-center space-y-2'>
                    <i className="fa-solid fa-check-double text-6xl text-blue-600"></i>
                    {
                        action === 'sign-in'
                            ?
                            <>
                                <h1 className='text-4xl font-bold'>Sign in to your account</h1>
                                <p>
                                    Or{' '}
                                    <Link to="/signup" className='transition-colors delay-75 font-medium outline-none text-blue-600 hover:text-blue-400 focus:text-blue-400'> sign up here</Link>
                                </p>
                            </>
                            :
                            <>
                                <h1 className=' transition delay-1000 ease-in-out text-4xl font-bold'>Sign up</h1>
                                <p>
                                    Already have account?
                                    <Link to="/signin" className='transition-colors delay-75 font-medium outlinenone text-blue-600 hover:text-blue-400 focus:text-blue-400'> sign in here</Link>
                                </p>
                            </>
                    }
                </div>
                {
                    action === 'sign-in'
                        ? <SignInForm />
                        : <SignUpForm />
                }
            </div>
        </div>
    );
}
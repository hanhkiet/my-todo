import React from 'react';

export default function LoginPanel() {
    return (
        <div className=' max-w-xl w-full mx-auto flex justify-center items-center flex-col space-y-6'>
            <div>
                <h2 className='text-5xl font-medium text-center'>Sign in to your account</h2>
            </div>
            <div className='bg-white rounded-md p-4'>
                <form action="POST" className='flex justify-center flex-col space-y-4'>
                    <div>
                        <label htmlFor="username" className='block'>Username</label>
                        <input type="text" name="name"
                            className='outline-none border-2 border-gray-300 rounded-md py-1 px-2 focus:border-blue-400' />
                    </div>
                    <div>
                        <label htmlFor="password" className='block'>Password</label>
                        <input type="password" name="password"
                            className='outline-none border-2 border-gray-300 rounded-md py-1 px-2 focus:border-blue-400' />
                    </div>
                    <input type="submit" value="Sign in" className='bg-blue-400 rounded-md py-1' />
                </form>
                <div>
                    <p>Or sign in with</p>
                    <div>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-google"></i>
                        <i className="fa-brands fa-github"></i>
                    </div>
                </div>
            </div>
        </div >
    );
}
import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className='h-screen w-screen bg-blue-300 flex justify-center items-center'>
                <div className=' basis-1/3 space-y-9'>
                    <div className=' text-center space-y-3'>
                        <h1 className=' text-4xl font-semibold'>Sign in to your account</h1>
                    </div>
                    <div className=' bg-white p-10 rounded-xl space-y-10'>
                        <form action="POST" className='space-y-7'>
                            <div className='space-y-1'>
                                <label className='block text-lg font-medium text-gray-600'>Username</label>
                                <input type="text" name="username" className='w-full outline-none border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <div className='space-y-1'>
                                <label className='block text-lg font-medium text-gray-600'>Password</label>
                                <input type="password" name="password" className='w-full outline-none border-2 border-gray-300 rounded-md p-2' />
                            </div>
                            <input type="submit" value="Log in" className=' w-full outline-none bg-blue-600 py-2 rounded-md text-white cursor-pointer' />
                        </form>
                        <div className=' text-center space-y-3'>
                            <p className=' text-lg'>Or continue with</p>
                            <div className=' flex items-center gap-3'>
                                <button className=' border-2 border-gray-400 rounded-md p-1 basis-1/3'>
                                    <i className="fa-brands fa-facebook text-4xl text-gray-500"></i>
                                </button>
                                <button className=' border-2 border-gray-400 rounded-md p-1 basis-1/3'>
                                    <i className="fa-brands fa-google text-4xl text-gray-500"></i>
                                </button>
                                <button className=' border-2 border-gray-400 rounded-md p-1 basis-1/3'>
                                    <i className="fa-brands fa-github text-4xl text-gray-500"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
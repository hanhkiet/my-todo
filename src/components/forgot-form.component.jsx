import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ForgotPasswordForm() {

    const emailRef = useRef();

    const auth = useAuth();

    const handleResetPassword = () => {
    }

    return (
        <div className='bg-white p-9 rounded-2xl space-y-10 shadow-xl'>
            <div className="space-y-4">
                <div className='space-y-1'>
                    <label htmlFor="email" className='after:content-["*"] after:ml-0.5 after:text-red-500 block text-md font-semibold text-gray-600'>Email</label>
                    <input ref={emailRef} type="email" name="email"
                        className='peer w-full outline-none border-2 border-gray-300 
                        rounded-md p-2 shadow-sm invalid:border-red-500' />
                    <label className="invisible text-red-500 peer-invalid:visible">Email is not valid</label>
                </div>
                <button onClick={handleResetPassword} className='transition-colors ease-in-out duration-100 w-full outline-none font-medium bg-blue-600
                 hover:bg-blue-500 focus:bg-blue-500 py-2 rounded-md 
                 text-white cursor-pointer'>Reset password</button>
            </div>


        </div>
    );
}
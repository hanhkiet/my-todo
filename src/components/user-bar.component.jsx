import React, { useCallback, useRef } from 'react';
import useToggle from '../hooks/useToggle';
import { UserCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import useRequireAuth from '../hooks/useRequireAuth';
import { Navigate } from 'react-router-dom';

export default function UserBar({ showDetail = true }) {

    const [open, setOpen] = useToggle();

    const optionsRef = useRef(null);

    useOnClickOutside(optionsRef, () => open ? setOpen() : null);

    const { signout, user } = useRequireAuth();

    const handleSignout = useCallback(() => signout()
        .then(() => <Navigate to='/signin' />), [signout]);

    return (
        <div ref={optionsRef} className='w-full h-18 relative flex justify-center'>
            <button onClick={setOpen} className='flex items-center justify-center space-x-1 outline-none 
            transition-colors duration-100 focus:bg-blue-100 hover:bg-blue-100 
            rounded-md p-2'>
                <UserCircleIcon className='h-12 w-12 text-blue-500' />
                {showDetail ?
                    <div className=' text-left'>
                        <h2 className='text-lg font-semibold'>{user.displayName}</h2>
                        <p className='text-xs'>{user.email}</p>
                    </div>
                    : null
                }
            </button>
            {
                open
                    ? <div className='absolute z-100 min-w-fit top-2 rounded-md left-full 
                            mx-3 bg-slate-200 overflow-hidden'>
                        <button className='w-48 h-12 p-2 flex items-center space-x-3 hover:bg-slate-300'>
                            <CogIcon className='h-6 w-6 text-blue-500' />
                            <p>Settings</p>
                        </button>
                        <button onClick={handleSignout} className='w-48 h-12 p-2 flex items-center space-x-3 hover:bg-slate-300'>
                            <LogoutIcon className='h-6 w-6 text-blue-500' />
                            <p>Log out</p>
                        </button>
                    </div>
                    : null
            }
        </div>
    );
}
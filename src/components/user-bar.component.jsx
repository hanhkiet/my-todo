import React, { useCallback, useRef } from 'react';
import useToggle from '../hooks/useToggle';
import { UserCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import useRequireAuth from '../hooks/useRequireAuth';
import { Navigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Property from './property.component';
import { substring } from '../utils/substring';

const user_button = 'flex items-center justify-center space-x-1 outline-none' +
    'transition-colors duration-100 focus:bg-blue-100 hover:bg-blue-100 rounded-md p-2';

export default function UserBar() {

    const [open, toggle] = useToggle();
    const optionsRef = useRef(null);

    const { showSidebar } = useSidebar();

    useOnClickOutside(optionsRef, open ? toggle : null);

    const { signout, user } = useRequireAuth();

    const handleSignout = useCallback(() => signout()
        .then(() => <Navigate to='/signin' />), [signout]);

    return (
        <div ref={optionsRef} className='w-full h-18 relative flex justify-center'>
            <button onClick={toggle} className={user_button}>
                <UserCircleIcon className='h-12 w-12 text-blue-500' />
                {showSidebar ?
                    <div className='text-left'>
                        <h2 className='text-lg font-semibold'>{user.displayName ? substring(user.displayName, 20) : "Anonymous"}</h2>
                        <p className='text-xs'>{substring(user.email, 25)}</p>
                    </div>
                    : null
                }
            </button>
            {
                open
                    ? <Property>
                        <button className='w-40 h-9 p-2 flex items-center space-x-3 hover:bg-slate-300'>
                            <CogIcon className='icon' />
                            <p>Settings</p>
                        </button>
                        <button onClick={handleSignout} className='w-40 h-9 p-2 flex items-center space-x-3 hover:bg-slate-300'>
                            <LogoutIcon className='icon' />
                            <p>Log out</p>
                        </button>
                    </Property>
                    : null
            }
        </div>
    );
}
import React, { useCallback, useRef } from 'react';
import useToggle from '../hooks/useToggle';
import { UserCircleIcon } from '@heroicons/react/solid';
import { LogoutIcon, CogIcon } from '@heroicons/react/outline';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import useRequireAuth from '../hooks/useRequireAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Property from './property.component';
import { substring } from '../utils/substring';
import { doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

const user_button = 'flex items-center justify-center space-x-1 outline-none' +
    'transition-colors duration-100 focus:bg-blue-100 hover:bg-blue-100 rounded-md p-2';

export default function UserBar() {

    const [open, toggle] = useToggle();
    const optionsRef = useRef(null);

    const { showSidebar } = useSidebar();
    const navigate = useNavigate();

    const { signout, user } = useRequireAuth();

    const getData = useCallback(() => doc(firestore, 'users', user.uid), [user.uid]);

    const [data, loading, error] = useDocument(getData());


    useOnClickOutside(optionsRef, open ? toggle : null);

    const handleSignout = useCallback(() => signout()
        .then(() => <Navigate to='/signin' />), [signout]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleOpenSettings = () => {
        navigate('/dashboard/settings');
    }

    const displayName = data.data().displayName ? data.data().displayName : user.displayName;

    return (
        <div ref={optionsRef} className='w-full h-18 relative flex justify-center'>
            <button onClick={toggle} className={user_button}>
                <UserCircleIcon className='h-12 w-12 text-blue-500' />
                {showSidebar ?
                    <div className='text-left'>
                        <h2 className='text-lg font-semibold'>{displayName ? substring(displayName, 17) : "Anonymous"}</h2>
                        <p className='text-xs'>{substring(user.email, 22)}</p>
                    </div>
                    : null
                }
            </button>
            {
                open
                    ? <Property>
                        <button onClick={handleOpenSettings} className='w-40 h-9 p-2 flex items-center space-x-3 hover:bg-slate-300'>
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
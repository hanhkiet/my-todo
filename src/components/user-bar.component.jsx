import React from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';

export default function UserBar({ showDetail = true }) {

    return (
        <div className='w-full h-20 flex justify-center p-2'>
            <button className='flex items-center justify-center space-x-1 outline-none transition-colors delay-75
             focus:bg-blue-100 hover:bg-blue-100 rounded-md p-2'>
                <UserCircleIcon className=' h-12 w-12 text-blue-500' />
                {showDetail ?
                    <div className=' text-left'>
                        <h2 className='text-xl font-semibold'>Huynh Anh Kiet</h2>
                        <p className='text-xs'>huynhanhkiet179@gmail.com</p>
                    </div>
                    : null
                }
            </button>
        </div>
    );
}
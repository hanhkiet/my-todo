import React from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';

export default function MainBoard() {

    return (
        <div className='flex-grow bg-slate-100 space-y-2'>
            {/* Function bar */}
            <div className='w-full p-2 flex items-center justify-start gap-4'>
                <button className='outline-none hover:bg-slate-200 rounded-sm'>
                    <MenuIcon className='h-8 w-8 text-blue-500 cursor-pointer' />
                </button>
                <div className='relative drop-shadow-sm'>
                    <SearchIcon className='h-6 w-6 text-blue-500 absolute left-1.5 top-1.5 bottom-1.5' />
                    <input className='pl-9 py-1.5 outline-none rounded-md border-2 focus:border-blue-400'
                        type="text" placeholder='search anything...' />
                </div>
            </div>
            {/* Tasks */}
            <div className='w-full h-full'></div>
        </div>
    );
}
import React from 'react';
import { CalendarIcon, MenuIcon, SearchIcon, StarIcon, TrendingUpIcon, UserCircleIcon } from '@heroicons/react/solid'

export default function Main() {
    return <div className=' h-screen w-screen flex'>
        {/* Sidebar */}
        <div className='basis-1/6 bg-blue-200 space-y-3 rounded-r-md drop-shadow-md'>
            {/* User icon */}
            <div className='w-full h-20 flex justify-center p-2'>
                <button className='flex items-center justify-center space-x-1 outline-none focus:bg-blue-100
                 hover:bg-blue-100 rounded-md p-2'>
                    <UserCircleIcon className=' h-12 w-12 text-blue-500' />
                    <div className=' text-left'>
                        <h2 className='text-xl font-semibold'>Huynh Anh Kiet</h2>
                        <p className='text-xs'>huynhanhkiet179@gmail.com</p>
                    </div>
                </button>
            </div>
            {/* Todo list */}
            <ul className='space-y-1 p-1'>
                {/* todo list item */}
                <li>
                    <button className='focus:bg-blue-100 py-2 px-3 rounded-md outline-none
                     flex items-center space-x-3 w-full'>
                        <CalendarIcon className='h-6 w-6 text-blue-500' />
                        <p>Today</p>
                    </button>
                </li>
                <li>
                    <button className='focus:bg-blue-100 py-2 px-3 rounded-md outline-none
                     flex items-center space-x-3 w-full'>
                        <StarIcon className='h-6 w-6 text-blue-500' />
                        <p>Important</p>
                    </button>
                </li>
                <li>
                    <button className='focus:bg-blue-100 py-2 px-3 rounded-md outline-none
                     flex items-center space-x-3 w-full'>
                        <TrendingUpIcon className='h-6 w-6 text-blue-500' />
                        <p>Streak</p>
                    </button>
                </li>
            </ul>
        </div>
        {/* Board */}
        <div className='flex-grow bg-slate-100 space-y-2'>
            {/* Function bar */}
            <div className='w-full p-2 flex items-center justify-start gap-4'>
                <button className='outline-none focus:bg-slate-200 hover:bg-slate-200 rounded-sm'>
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
    </div>;
}
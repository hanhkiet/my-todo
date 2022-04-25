import React from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import { useFirestoreQuery } from '../hooks/useFirestoreQuery';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from "../firebase";
import useRequireAuth from '../hooks/useRequireAuth';

export default function MainBoard({ toggleSidebar, collectionId }) {

    const { user } = useRequireAuth();

    console.log(user.uid);
    console.log(collectionId);

    const { data, status, error } = useFirestoreQuery(getDocs(collection(
        firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks')));

    if (status === 'loading') {
        return <p>Loading</p>
    }

    console.log(data.docs);

    if (error) {
        console.log(error);
    }

    return (
        <div className='grow bg-slate-100 space-y-2 z-1 overflow-y-auto'>
            {/* Function bar */}
            <div className='w-full p-2 flex items-center justify-between pr-12 sticky z-10 top-0 bg-slate-200 bg-opacity-75'>
                <button onClick={toggleSidebar} className='outline-none hover:bg-slate-200 rounded-sm'>
                    <MenuIcon className='h-8 w-8 text-blue-500 cursor-pointer' />
                </button>
                <div className='relative'>
                    <SearchIcon className='h-6 w-6 text-blue-500 absolute left-1.5 top-1.5 bottom-1.5' />
                    <input className='pl-9 py-1.5 outline-none rounded-md border-2 transition-colors duration-150 
                    focus:border-blue-400' type="text" placeholder='search anything...' />
                </div>
            </div>
            {/* Tasks */}
            <div className='w-full flex flex-wrap justify-around gap-6 p-2 z-1'>
            </div>
        </div>
    );
}
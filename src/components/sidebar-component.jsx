import React from "react";
import UserBar from "./user-bar.component";
import { CalendarIcon } from "@heroicons/react/solid";

const styles = 'transition-colors delay-75 hover:bg-blue-100 hover:drop-shadow-sm' +
    'focus:bg-blue-100 focus:drop-shadow-md py-2 px-3 rounded-md outline-none flex items-center space-x-3';
export default function SideBar({ showDetail = true }) {

    return (
        <div className='bg-blue-200 space-y-3 rounded-r-md drop-shadow-md'>
            <UserBar showDetail={showDetail} />
            {/* Todo list */}
            <ul className='space-y-1 py-1 mx-2'>
                {/* todo list item */}
                <li>
                    <button className={`${styles} ${showDetail ? 'w-full' : null}`}>
                        <CalendarIcon className='h-6 w-6 text-blue-500' />
                        {showDetail ? <p>Today</p> : null}
                    </button>
                </li>
            </ul>
        </div >
    );
}
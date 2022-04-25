import React from "react";
import UserBar from "./user-bar.component";
import Collection from "./collection.component";

export default function SideBar({ showDetail = true }) {

    return (
        <div className='bg-blue-200 space-y-3 rounded-r-md drop-shadow-md p-2 z-10'>
            <UserBar showDetail={showDetail} />
            {/* Todo list */}
            <Collection showDetail={showDetail} />
        </div >
    );
}
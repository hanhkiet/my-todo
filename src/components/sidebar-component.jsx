import React from "react";
import UserBar from "./user-bar.component";
import TodoList from "./todo-list.component";

export default function SideBar({ showDetail = true }) {

    return (
        <div className='bg-blue-200 space-y-3 rounded-r-md drop-shadow-md p-2'>
            <UserBar showDetail={showDetail} />
            {/* Todo list */}
            <TodoList showDetail={showDetail} />
        </div >
    );
}
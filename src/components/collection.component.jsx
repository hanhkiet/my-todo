import { HeartIcon, PlusIcon, SunIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import TaskList from "./tasklist.component";

const collection_list_style = 'transition-colors duration-100 hover:bg-blue-100 hover:drop-shadow-sm' +
    'focus:bg-blue-100 focus:drop-shadow-sm py-2 px-3 rounded-md outline-none flex items-center justify-between space-x-3';

const selected = 'bg-blue-100';

export default function Collection({ lists, addList, deleteList, changeDataList }) {

    const [inputing, setInputing] = useState(false);

    const { showSidebar } = useSidebar();

    const fieldRef = useRef(null);

    const { collectionId } = useParams();

    const handleToggle = useCallback(() => {
        if (fieldRef.current.value.trim().length === 0) {
            console.log('fail');
        } else {
            addList({ name: fieldRef.current.value.trim() });
        }

        setInputing(false);
    }, [fieldRef]);

    useOnClickOutside(fieldRef, handleToggle);

    return (
        <>
            <ul className={`space-y-1 flex flex-col pb-2 border-b-2 border-b-gray-400 ${showSidebar ? null : 'items-center'}`}>
                {/* todo lists default item*/}
                <li key='today'>
                    <Link to='today' className={`${collection_list_style} ${showSidebar ? 'w-full' : null} ${collectionId === 'today' ? selected : null}`}>
                        <div className="flex space-x-3">
                            <SunIcon className='icon' />
                            {showSidebar ? <p>Today</p> : null}
                        </div>
                    </Link>
                </li>
                <li key='favorites'>
                    <Link to='favorites' className={`${collection_list_style} ${showSidebar ? 'w-full' : null} ${collectionId === 'favorites' ? selected : null}`}>
                        <div className="flex space-x-3">
                            <HeartIcon className='icon' />
                            {showSidebar ? <p>Favorites</p> : null}
                        </div>
                    </Link>
                </li>
                <li key='streaks'>
                    <Link to='streaks' className={`${collection_list_style} ${showSidebar ? 'w-full' : null} ${collectionId === 'streaks' ? selected : null}`}>
                        <div className="flex space-x-3">
                            <TrendingUpIcon className='icon' />
                            {showSidebar ? <p>Streaks</p> : null}
                        </div>
                    </Link>
                </li>
            </ul>
            {/* todo list of user */}
            <ul className={`space-y-1 flex flex-col ${showSidebar ? null : 'items-center'}`}>
                {
                    lists.map((list) => (
                        <li key={list.id}>
                            <TaskList deleteList={deleteList} changeDataList={changeDataList} id={list.id}
                                name={list.name} showSidebar={showSidebar}
                                className={`${collection_list_style} relative cursor-pointer ${showSidebar ? 'w-full' : null} ${collectionId === list.id ? selected : null}`} />
                        </li>
                    ))
                }
                <li key='create'>
                    <button onClick={() => setInputing(true)} className={`${collection_list_style} ${showSidebar ? 'w-full' : null} 
                                            ${inputing ? 'bg-blue-100' : null}`}>
                        <div className="flex space-x-3">
                            <PlusIcon className="icon" />
                            {
                                showSidebar ? (
                                    inputing ? <input ref={fieldRef} autoFocus size={14}
                                        className="bg-inherit outline-none" />
                                        : <p>New</p>)
                                    : null
                            }
                        </div>
                    </button>
                </li>
            </ul>
        </>
    );
}
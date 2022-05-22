import { HeartIcon, PlusIcon, SunIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import TaskList from "./tasklist.component";
import { Timestamp } from "firebase/firestore";

const collection_list_style = 'transition-colors duration-100 hover:bg-blue-100 hover:drop-shadow-sm' +
    'focus:bg-blue-100 focus:drop-shadow-sm py-2 px-3 rounded-md outline-none flex items-center justify-between space-x-3';

const selected = 'bg-blue-100';

function ListNameInput({ addList }) {
    const { showSidebar, toggleSidebar } = useSidebar();
    const [inputing, setInputing] = useState(false);

    const fieldRef = useRef(null);

    const handleClickOutside = () => {
        const name = fieldRef ? fieldRef.current.value.trim() : null;
        if (name) {
            addList(name);
        }
        setInputing(false);
    }

    const handleClick = () => {
        setInputing(true);

        if (!showSidebar) {
            toggleSidebar();
        }
    }

    useOnClickOutside(fieldRef, handleClickOutside);

    return (
        <button onClick={handleClick}
            className={`${collection_list_style} ${showSidebar ? 'w-full' : null} 
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
    );
}

export default function Collection({ lists, addList, deleteList, changeDataList }) {

    const { showSidebar } = useSidebar();

    const { collectionId } = useParams();

    const handleAddList = useCallback((name) => {
        addList({
            name,
            created: Timestamp.now()
        });
    }, [addList]);

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
                            {showSidebar ? <p>Upcoming</p> : null}
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
                                className={`${collection_list_style} relative group cursor-pointer ${showSidebar ? 'w-full' : null} ${collectionId === list.id ? selected : null}`} />
                        </li>
                    ))
                }
                <li key='create'>
                    <ListNameInput showSidebar={showSidebar} addList={handleAddList} />
                </li>
            </ul>
        </>
    );
}
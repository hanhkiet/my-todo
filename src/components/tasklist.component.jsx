import { CollectionIcon, DotsHorizontalIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import useToggle from "../hooks/useToggle";
import Property from "./property.component";

export default function TaskList({ id, name, showSidebar, deleteList, changeDataList, ...others }) {
    const navigate = useNavigate();

    const [open, toggle] = useToggle();

    const propertyRef = useRef(null);
    const fieldRef = useRef(null);

    const [inputing, setInputing] = useState(false);

    const handleDeleteList = () => {
        deleteList(id);
    }

    const handleSetInputing = () => {
        setInputing(true);
        toggle();
        fieldRef.current.value = name;
    }

    const handleChangeListName = () => {
        const newName = fieldRef.current.value;
        if (newName.trim().length === 0) {
            setInputing(false);
        } else {
            changeDataList(id, { name: newName });
            setInputing(false);
        }
    }

    useOnClickOutside(propertyRef, open ? toggle : null);
    useOnClickOutside(fieldRef, handleChangeListName);

    return (
        <div ref={propertyRef} onClick={() => navigate(id)} {...others}>
            <div className="flex space-x-3">
                <CollectionIcon className='h-6 w-6 text-blue-500' />
                {showSidebar ? (
                    inputing ? <input ref={fieldRef} autoFocus size={10}
                        className="bg-inherit outline-none" />
                        : <p>{name}</p>)
                    : null}
            </div>
            {showSidebar
                ? <DotsHorizontalIcon onClick={toggle} className='h-6 w-6 text-blue-500 opacity-0 
                hover:opacity-100 transition-opacity duration-100' />
                : null
            }

            {open
                ? <Property>
                    <button onClick={handleSetInputing}
                        className='w-40 h-9 p-2 flex items-center space-x-3 hover:bg-slate-300'>
                        <PencilAltIcon className='icon' />
                        <p>Rename</p>
                    </button>
                    <button onClick={handleDeleteList}
                        className='w-40 h-9 p-2 flex items-center space-x-3 hover:bg-slate-300'>
                        <TrashIcon className='icon' />
                        <p>Delete</p>
                    </button>
                </Property>
                : null
            }
        </div>
    )
}
import { CalendarIcon, CheckCircleIcon, CheckIcon, PencilIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { Calendar } from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import '../styles/calendar.css';
import compareDateToNow from '../utils/compareDateToNow';
import formatDate from '../utils/formatDate';

function CalendarOption({ date, setDate }) {
    const [isShow, setIsShow] = useState(false);
    const [value, setValue] = useState(new Date(date));
    const calendarRef = useRef(null);

    const handleClick = (event) => {
        event.stopPropagation();
        setIsShow((isShow) => !isShow);
    }

    const handleChangeData = (event) => {
        event.stopPropagation();
        setDate(value);
        setIsShow(false);
    }

    useOnClickOutside(calendarRef, handleChangeData);

    return (
        <div ref={calendarRef}>
            <button onClick={handleClick} className='relative group outline-none flex items-center border-2 
                        border-red-400 hover:border-red-600 rounded-md px-1 py-0.5 space-x-0.5'>
                <CalendarIcon className='h-4 w-4 text-red-400 group-hover:text-red-600 cursor-pointer' />
                <span className='text-xs text-gray-500'>{formatDate(value)}</span>
            </button>
            {isShow &&
                <div onClick={(event) => event.stopPropagation()}>
                    <Calendar onChange={setValue} value={value} />
                </div>
            }
        </div>
    );
}

function SubtaskOption() {
    const handleClick = (event) => {
        event.stopPropagation();
    }

    return (
        <button onClick={handleClick} className="flex items-center">
            <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
        </button>
    );
}

export default function Task({ id, uid, collectionId, title, description, status, hasSubTask,
    date, setTaskData, deleteTask }) {

    const [inputing, setInputing] = useState(false);
    const isCompleted = status === 'completed';

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const taskRef = useRef(null);

    const navigate = useNavigate();

    const handleChangeData = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.length === 0) {
            title = 'Untitled';
        }

        setTaskData(id, { title, description });
        setInputing(false);
        console.log(collectionId);

        if (collectionId) {
            setDoc(doc(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks', id),
                { title, description }, { merge: true });
        }

        // setInputing(false);
    }

    const handleMarkCompleted = (event) => {
        event.stopPropagation();
        setTaskData(id, { status: isCompleted ? "pending" : "completed" });
    }

    const setDate = (date) => {
        setTaskData(id, { date });
    }

    const handleOpenEditMode = (event) => {
        event.stopPropagation();
        setInputing(true);
    }

    const handleCancelEditMode = (event) => {
        event.stopPropagation();
        setInputing(false);
    }

    const handleDeleteTask = (event) => {
        event.stopPropagation();
        deleteTask(id);
        if (collectionId) {
            deleteDoc(doc(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks', id))
        }
    }

    useOnClickOutside(taskRef, handleChangeData);

    if (inputing) {
        return (
            <div ref={taskRef} className="group relative border-2 px-4 py-2 rounded-md space-y-2 hover:border-slate-400">
                <div className="absolute top-3 right-3 flex space-x-2">
                    <button onClick={handleChangeData} className="outline-none">
                        <CheckIcon className="text-green-500 hover:text-green-700 h-4 w-4 transition-colors duration-75" />
                    </button>
                    <button onClick={handleCancelEditMode} className="outline-none">
                        <XIcon className="text-red-500 hover:text-red-700 h-4 w-4 transition-colors duration-75" />
                    </button>
                </div>
                <div className="space-y-1">
                    <input ref={titleRef} autoFocus type="text" className="text-3xl leading-3 min-h-fit outline-none w-full"
                        defaultValue={title} placeholder="title" />
                    <textarea ref={descriptionRef} rows="2" className="min-h-fit w-full outline-none resize-none text-gray-500"
                        defaultValue={description} placeholder="description" />
                </div>
                <div className='flex space-x-2'>
                    <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
                    <CalendarIcon className='h-4 w-4 text-red-400 hover:text-red-600 cursor-pointer' />
                </div>
            </div>
        );
    }

    return (
        <div onClick={() => navigate(id)} className={`group relative border-2 px-4 py-2 rounded-md space-y-2 
                        ${isCompleted ? 'border-slate-400 bg-slate-300' : ''} hover:border-slate-400 cursor-pointer`}>
            <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                <button onClick={handleOpenEditMode} className="outline-none">
                    <PencilIcon className='text-gray-500 hover:text-gray-700 h-4 w-4 transition-colors duration-75' />
                </button>
                <button className="outline-none">
                    <TrashIcon onClick={handleDeleteTask} className="text-red-500 hover:text-red-700 h-4 w-4 transition-colors duration-75" />
                </button>
            </div>
            <button onClick={handleMarkCompleted} className={`outline-none absolute -top-5 -left-3 z-10 bg-white rounded-full group-hover:opacity-100 
                        ${isCompleted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>
                <CheckCircleIcon className={`h-6 w-6 ${isCompleted ? 'text-blue-400 hover:text-gray-400' : 'text-gray-400 hover:text-blue-400'}  transition-colors duration-75`} />
            </button>
            <div className="space-y-1">
                <h2 className={`text-3xl leading-9 ${isCompleted && 'line-through'}`}>{title}</h2>
                <p className={`leading-6 ${isCompleted && 'line-through'}`}>{description}</p>
            </div>
            <div className='flex space-x-2'>
                {hasSubTask && <SubtaskOption />}
                <div className='flex items-center space-x-2'>
                    <CalendarOption date={date} setDate={setDate} />
                    {(compareDateToNow(date) < 0 && !isCompleted) && <span className='text-sm text-red-600'>Overdue</span>}
                </div>
            </div>
        </div >
    );
}
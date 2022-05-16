import { CalendarIcon, CheckIcon, PencilIcon } from '@heroicons/react/outline';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export default function Task({ id, title, description, setTaskData }) {

    const [inputing, setInputing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const taskRef = useRef(null);

    const handleChangeData = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.length === 0) {
            title = 'Untitled';
        }

        setTaskData(id, { title, description });
        setInputing(false);
    }

    useOnClickOutside(taskRef, handleChangeData);

    if (inputing) {
        return (
            <div ref={taskRef} className="group relative border-2 px-4 py-2 rounded-md space-y-2 hover:border-slate-400">
                <button onClick={handleChangeData} className="outline-none absolute top-3 right-3">
                    <CheckIcon className="text-gray-500 hover:text-gray-700 h-4 w-4 transition-colors duration-75" />
                </button>
                <div className="space-y-1">
                    <input ref={titleRef} autoFocus type="text" className="text-3xl leading-3 min-h-fit outline-none w-full" defaultValue={title} />
                    <textarea ref={descriptionRef} rows="1" className="min-h-fit w-full outline-none resize-none text-gray-500"
                        defaultValue={description}></textarea>
                </div>
                <div className='flex space-x-2'>
                    <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
                    <CalendarIcon className='h-4 w-4 text-red-400 hover:text-red-600 cursor-pointer' />
                </div>
            </div>
        );
    }

    return (
        <div className="group relative border-2 px-4 py-2 rounded-md space-y-2 hover:border-slate-400">
            <button onClick={() => setInputing(true)} className="outline-none absolute top-3 right-3">
                <PencilIcon className='text-gray-500 hover:text-gray-700 h-4 w-4 transition-colors duration-75' />
            </button>
            <div className="space-y-1">
                <h2 className="text-3xl leading-9">{title}</h2>
                <p className="leading-6">{description}</p>
            </div >
            <div className='flex space-x-2'>
                <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
                <CalendarIcon className='h-4 w-4 text-red-400 hover:text-red-600 cursor-pointer' />
            </div>
        </div >
    );
}
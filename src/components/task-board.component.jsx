import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { useCallback, useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";
import { useDocument } from 'react-firebase-hooks/firestore';
import Task from "./task.component";
import { CalendarIcon, CheckIcon, MenuAlt2Icon, PlusCircleIcon, XIcon } from "@heroicons/react/outline";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

function AddTaskFragment({ addTask }) {
    const [inputing, setInputing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const taskRef = useRef(null);

    const handleAddTask = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.trim().length === 0) {
            title = 'Untitled';
        }

        addTask({
            title,
            description,
            created: Timestamp.now()
        });
        setInputing(false);
    }

    useOnClickOutside(taskRef, handleAddTask);

    if (inputing) {
        return (
            <div ref={taskRef} className="group relative border-2 px-4 py-2 rounded-md space-y-2 hover:border-slate-400">
                <div className="absolute top-3 right-3 flex space-x-2">
                    <button onClick={handleAddTask} className="outline-none">
                        <CheckIcon className="text-gray-500 hover:text-gray-700 h-4 w-4 transition-colors duration-75" />
                    </button>
                    <button onClick={() => setInputing(false)} className="outline-none">
                        <XIcon className="text-gray-500 hover:text-gray-700 h-4 w-4 transition-colors duration-75" />
                    </button>
                </div>
                <div className="space-y-1">
                    <input ref={titleRef} autoFocus type="text" className="text-3xl leading-3 min-h-fit outline-none w-full"
                        placeholder="title" />
                    <textarea ref={descriptionRef} rows="1" className="min-h-fit w-full outline-none resize-none text-gray-500"
                        placeholder="description"></textarea>
                </div>
                <div className='flex space-x-2'>
                    <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
                    <CalendarIcon className='h-4 w-4 text-red-400 hover:text-red-600 cursor-pointer' />
                </div>
            </div>
        );
    }

    return <button onClick={() => setInputing(true)} className="py-2 rounded-md outline-none">
        <div className="group flex items-center space-x-3">
            <PlusCircleIcon className="h-5 w-5 text-blue-300 group-hover:text-blue-500" />
            <p className="text-lg text-gray-300 group-hover:text-gray-500">New task</p>
        </div>
    </button>;
}

export default function TaskBoard() {

    const { user } = useRequireAuth();
    const { collectionId } = useParams();

    const getTasks = useCallback(() =>
        collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks')
        , [collectionId, user.uid]);

    const addTask = useCallback((data) =>
        addDoc(collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks'), data)
        , [collectionId, user.uid]);

    const setTaskData = useCallback((id, data) => {
        setDoc(doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', id), data, { merge: true });
    }, [collectionId, user.uid]);

    const deleteTask = useCallback((id) =>
        deleteDoc(doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', id))
        , [collectionId, user.uid]);

    const [data, loading, error] = useDocument(getTasks());

    if (loading) {
        return <div className="w-full h-fit px-32 lg:px48 xl:px-60 py-6 z-1 flex items-center justify-center">
            <i className="fa-solid fa-check-double text-xl text-blue-600"></i>
        </div>;
    }

    const rawLists = data.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }).sort((a, b) => {
        return a.created.seconds - b.created.seconds;
    });

    const lists = rawLists.map((doc) => {
        console.log(doc.created.seconds);
        return <li key={doc.id} >
            <Task {...doc} id={doc.id} setTaskData={setTaskData} deleteTask={deleteTask} />
        </li>
    });

    return (
        <div className='w-full h-fit px-32 lg:px-48 xl:px-60 py-6 z-1 space-y-2'>
            <ul className="space-y-4">
                {lists}
            </ul>
            <AddTaskFragment addTask={addTask} />
            <Outlet />
        </div>
    );
}
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { useCallback, useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";
import { useDocument } from 'react-firebase-hooks/firestore';
import Task from "./task.component";
import { CalendarIcon, CheckIcon, MenuAlt2Icon, PlusCircleIcon, XIcon } from "@heroicons/react/outline";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useSearchContent } from '../context/SearchContentContext';
import { Calendar } from "react-calendar";
import formatDate from "../utils/formatDate";

function getList(data, searchContent) {
    const list = data.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });

    const sortedList = list.sort((a, b) => {
        const completedA = a.status === 'completed' ? 1 : 0;
        const completedB = b.status === 'completed' ? 1 : 0;
        if (completedA === completedB) {
            return a.created.seconds - b.created.seconds;
        } else {
            return completedA - completedB;
        }
    });

    if (searchContent) {
        return sortedList.filter(doc => {
            return doc.title.includes(searchContent) || doc.description.includes(searchContent);
        });
    } else {
        return sortedList;
    }
}

function CalendarOption({ date, setDate }) {
    const [isShow, setIsShow] = useState(false);

    const calendarRef = useRef(null);

    const handleClick = (event) => {
        event.stopPropagation();
        setIsShow((isShow) => !isShow);
    }

    const handleClickOutside = () => {
        setIsShow(false);
    }

    useOnClickOutside(calendarRef, handleClickOutside);

    return (
        <div ref={calendarRef}>
            <button onClick={handleClick} className='relative group outline-none flex items-center border-2 border-red-400 hover:border-red-500 rounded-md px-1 py-0.5 space-x-0.5'>
                <CalendarIcon className='h-4 w-4 text-red-400 group-hover:text-red-500 cursor-pointer' />
                <span className='text-xs text-gray-500'>{formatDate(date)}</span>
            </button>
            {isShow &&
                <div onClick={(event) => event.stopPropagation()}>
                    <Calendar onChange={setDate} value={date} />
                </div>
            }
        </div>
    );
}

function AddTaskFragment({ addTask }) {
    const [inputing, setInputing] = useState(false);
    const [date, setDate] = useState(new Date());

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
            date,
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
                        <CheckIcon className="text-green-500 hover:text-green-700 h-4 w-4 transition-colors duration-75" />
                    </button>
                    <button onClick={() => setInputing(false)} className="outline-none">
                        <XIcon className="text-red-500 hover:text-red-700 h-4 w-4 transition-colors duration-75" />
                    </button>
                </div>
                <div className="space-y-1">
                    <input ref={titleRef} autoFocus type="text" className="text-3xl leading-3 min-h-fit outline-none w-full"
                        placeholder="title" />
                    <textarea ref={descriptionRef} rows="1" className="min-h-fit w-full outline-none resize-none text-gray-500"
                        placeholder="description"></textarea>
                </div>
                <div className='flex space-x-2 items-center'>
                    <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
                    <CalendarOption date={date} setDate={setDate} />
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

function TodayTaskBoard({ uid, rawList }) {
    const addTask = useCallback((data) =>
        addDoc(collection(firestore, 'uncategoried', uid, 'todo-lists'), data)
        , [uid]);

    const setTaskData = useCallback((id, data) => {
        setDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id), data, { merge: true });
    }, [uid]);

    const deleteTask = useCallback((id) =>
        deleteDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id))
        , [uid]);

    const list = rawList.map((doc) => {
        const date = (new Timestamp(doc.date.seconds, doc.date.nanoseconds)).toDate();
        const now = new Date(Date.now());
        const isYearEqual = date.getFullYear() === now.getFullYear();
        const isMonthEqual = date.getMonth() === now.getMonth();
        const isDateEqual = date.getDate() === now.getDate();

        if (isYearEqual && isMonthEqual && isDateEqual) {
            console.log(doc.collectionId);
            return <li key={doc.id}>
                <Task {...doc} date={date} id={doc.id} uid={uid} collectionId={doc.collectionId}
                    setTaskData={setTaskData} deleteTask={deleteTask} />
            </li>
        }
    });

    return (
        <div className='w-full h-fit px-32 lg:px-48 xl:px-60 py-6 z-1 space-y-2'>
            <ul className="space-y-4">
                {list}
            </ul>
            <AddTaskFragment addTask={addTask} />
            <Outlet />
        </div>
    );
}

function UpcomingTaskBoard({ uid, rawList }) {
    const setTaskData = useCallback((id, data) => {
        setDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id), data, { merge: true });
    }, [uid]);

    const deleteTask = useCallback((id) =>
        deleteDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id))
        , [uid]);

    const list = rawList.map((doc) => {
        const date = (new Timestamp(doc.date.seconds, doc.date.nanoseconds)).toDate();

        const now = new Date(Date.now());

        const isGreater = (date.getFullYear() > now.getFullYear()) ||
            (date.getFullYear() === now.getFullYear() && date.getMonth() > now.getMonth()) ||
            (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() > now.getDate())

        if (isGreater) {
            return <li key={doc.id} >
                <Task {...doc} date={date} id={doc.id} uid={uid} collectionId={doc.collectionId}
                    setTaskData={setTaskData} deleteTask={deleteTask} />
            </li>
        }
    });

    return (
        <div className='w-full h-fit px-32 lg:px-48 xl:px-60 py-6 z-1 space-y-2'>
            <ul className="space-y-4">
                {list}
            </ul>
            <Outlet />
        </div>
    );
}

function ArchivedTaskBoard({ uid, rawList }) {
    const setTaskData = useCallback((id, data) => {
        setDoc(doc(firestore, 'uncategoried', uid, 'tasks', id), data, { merge: true });
    }, [uid]);

    const deleteTask = useCallback((id) =>
        deleteDoc(doc(firestore, 'uncategoried', uid, 'tasks', id))
        , [uid]);

    const list = rawList.map((doc) => {
        const date = (new Timestamp(doc.date.seconds, doc.date.nanoseconds)).toDate();
        if (doc.status === 'completed') {
            return <li key={doc.id} >
                <Task {...doc} date={date} id={doc.id} uid={uid} collectionId={doc.collectionId}
                    setTaskData={setTaskData} deleteTask={deleteTask} />
            </li>
        }
    });

    return (
        <div className='w-full h-fit px-32 lg:px-48 xl:px-60 py-6 z-1 space-y-2'>
            <ul className="space-y-4">
                {list}
            </ul>
            <Outlet />
        </div>
    );
}

function NormalTaskBoard({ uid, collectionId }) {
    const { searchContent } = useSearchContent();

    const getTasks = useCallback(() =>
        collection(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks')
        , [collectionId, uid]);

    const addTask = useCallback((data) =>
        addDoc(collection(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks'), data)
        , [collectionId, uid]);

    const setDataInUnCategoried = useCallback((id, data) => {
        setDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id), data, { merge: true })
    }, [uid]);

    const deleteTaskInUncategoried = useCallback((id) => {
        deleteDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id))
    }, [uid]);

    const setTaskData = useCallback((id, data) => {
        setDoc(doc(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks', id), data, { merge: true })
            .then(() => setDataInUnCategoried(id, data));
    }, [collectionId, setDataInUnCategoried, uid]);

    const deleteTask = useCallback((id) =>
        deleteDoc(doc(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks', id))
            .then(() => deleteTaskInUncategoried(id))
        , [collectionId, deleteTaskInUncategoried, uid]);

    const addToUncategoried = useCallback((id, data) => {
        setDoc(doc(firestore, 'uncategoried', uid, 'todo-lists', id), data, { merge: true })
    }, [uid]);


    const [data, loading, error] = useDocument(getTasks());

    if (loading) {
        return <div className="w-full h-fit px-32 lg:px48 xl:px-60 py-6 z-1 flex items-center justify-center">
            <i className="fa-solid fa-check-double text-xl text-blue-600"></i>
        </div>;
    }

    const rawList = getList(data, searchContent);

    const list = rawList.map((doc) => {
        const date = (new Timestamp(doc.date.seconds, doc.date.nanoseconds)).toDate();

        addToUncategoried(doc.id, {
            ...doc,
            collectionId,
            date
        });

        return <li key={doc.id} >
            <Task {...doc} date={date} collectionId={collectionId}
                id={doc.id} setTaskData={setTaskData}
                deleteTask={deleteTask} />
        </li>
    });

    return (
        <div className='w-full h-fit px-32 lg:px-48 xl:px-60 py-6 z-1 space-y-2'>
            <ul className="space-y-4">
                {list}
            </ul>
            <AddTaskFragment addTask={addTask} />
            <Outlet />
        </div>
    );
}

export default function TaskBoard() {
    const { user } = useRequireAuth();
    const { collectionId } = useParams();
    const { searchContent } = useSearchContent();

    const getTasks = useCallback(() =>
        collection(firestore, 'uncategoried', user.uid, 'todo-lists')
        , [user.uid]);

    const [data, loading, error] = useDocument(getTasks());

    if (loading) {
        return <div className="w-full h-fit px-32 lg:px48 xl:px-60 py-6 z-1 flex items-center justify-center">
            <i className="fa-solid fa-check-double text-xl text-blue-600"></i>
        </div>;
    }

    const rawList = getList(data, searchContent);

    if (collectionId === 'today') {
        return <TodayTaskBoard uid={user.uid} rawList={rawList} />;
    }

    if (collectionId === 'archived') {
        return <ArchivedTaskBoard uid={user.uid} rawList={rawList} />;
    }

    if (collectionId === 'upcoming') {
        return <UpcomingTaskBoard uid={user.uid} rawList={rawList} />;
    }

    return <NormalTaskBoard uid={user.uid} collectionId={collectionId} />;
}
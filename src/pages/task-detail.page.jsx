import { Transition, Dialog } from "@headlessui/react";
import { CheckCircleIcon, CheckIcon, PencilIcon, PlusIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState, Fragment, useCallback, useRef } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";

function AddSubTaskFragment({ addSubTask }) {
    const [inputing, setInputing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleAddSubTask = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.trim().length === 0) {
            title = 'Untitled';
        }

        addSubTask({
            title,
            description,
            status: "pending",
            created: Timestamp.now()
        });
        setInputing(false);
    }

    if (!inputing) {
        return (
            <button onClick={() => setInputing(true)} className="flex items-center space-x-2 outline-none">
                <PlusIcon className="h-4 w-4" />
                <span className="text-md text-gray-600">Add task</span>
            </button>);
    }

    return <div className="relative border-2 border-blue-200 rounded-md p-2">
        <div className="absolute right-2 flex space-x-1">
            <button className="outline-none">
                <CheckIcon onClick={handleAddSubTask} className="h-3 w-3 text-green-500 hover:text-green-400" />
            </button>
            <button onClick={() => setInputing(false)} className="outline-none">
                <XIcon className="h-3 w-3 text-red-500 hover:text-red-400" />
            </button>
        </div>
        <input ref={titleRef} autoFocus type="text" placeholder="title" className="w-full text-lg outline-none" />
        <textarea ref={descriptionRef} rows="1" className="w-full text-sm min-h-fit outline-none resize-none"
            placeholder="description">
        </textarea>
    </div>;
}

function SubTask({ collectionId }) {
    const { user } = useRequireAuth();
    const params = useParams();

    if (!collectionId) {
        collectionId = params.collectionId;
    }

    const { taskId } = params;

    const getSubTasks = useCallback(() => {
        return collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId, 'sub-tasks')
    }, [collectionId, taskId, user.uid]);

    const addSubTask = useCallback((data) =>
        addDoc(collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId, 'sub-tasks'), data)
        , [collectionId, taskId, user.uid]);

    const setSubTaskData = useCallback((id, data) =>
        setDoc(doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId, 'sub-tasks', id)
            , data, { merge: true })
        , [collectionId, taskId, user.uid]);

    const deleteSubTask = useCallback((id) => {
        deleteDoc(doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId, 'sub-tasks', id))
    }, [collectionId, taskId, user.uid]);

    const [data, loading, error] = useDocument(getSubTasks());

    if (loading) {
        return <p>Loading...</p>;
    }

    const rawLists = data.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        };
    }).sort((a, b) => {
        return a.created.seconds - b.created.seconds;
    });

    const lists = rawLists.map((doc) => {
        return <li key={doc.id}>
            <SubTaskDisplay {...doc} setSubTaskData={setSubTaskData} deleteSubTask={deleteSubTask} />
        </li>
    });

    return (
        <div className="space-y-2">
            <h3 className="text-md font-semibold">Subtask</h3>
            <ul className="space-y-2 overflow-y-scroll">
                {lists}
                <AddSubTaskFragment addSubTask={addSubTask} />
            </ul>
        </div>
    );
}

function SubTaskDisplay({ id, title, description, status, setSubTaskData, deleteSubTask }) {
    const [inputing, setInputing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const isCompleted = status === "completed";

    const handleChangeData = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.length === 0) {
            title = 'Untitled';
        }

        setSubTaskData(id, { title, description, status: "pending" });
        setInputing(false);
    }

    const handleMarkCompleted = () => {
        setSubTaskData(id, { status: isCompleted ? 'pending' : 'completed' });
    }

    const handleDeleteSubTask = () => {
        deleteSubTask(id);
    }

    if (inputing) {
        return (
            <div className="relative border-2 border-blue-200 rounded-md p-2">
                <div className="absolute right-2 flex space-x-1">
                    <button onClick={handleChangeData} className="outline-none">
                        <CheckIcon className="h-3 w-3 text-green-500 hover:text-green-400" />
                    </button>
                    <button onClick={() => setInputing(false)} className="outline-none">
                        <XIcon className="h-3 w-3 text-red-500 hover:text-red-400" />
                    </button>
                </div>
                <input ref={titleRef} autoFocus type="text" defaultValue={title} placeholder="title" className="w-full text-md outline-none" />
                <textarea ref={descriptionRef} rows="1" className="w-full text-sm min-h-fit outline-none resize-none"
                    placeholder="description" defaultValue={description}>
                </textarea>
            </div >
        );
    }

    return <div className="relative flex items-center space-x-2">
        <button onClick={handleMarkCompleted} className="outline-none">
            <CheckCircleIcon className={`h-5 w-5 ${isCompleted && 'text-blue-400 hover:text-gray-400'} text-gray-400 hover:text-blue-400`} />
        </button>
        <div className="group grow">
            <div className="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                <button onClick={() => setInputing(true)} className="outline-none">
                    <PencilIcon className="h-3 w-3 text-gray-500 hover:text-gray-400" />
                </button>
                <button onClick={handleDeleteSubTask} className="outline-none">
                    <TrashIcon className="h-3 w-3 text-red-500 hover:text-red-400" />
                </button>
            </div>
            <h4 className={`text-md ${isCompleted && 'line-through'}`}>{title}</h4>
            <p className={`text-xs ${isCompleted && 'line-through'}`}>{description}</p>
        </div>
    </div>;
}

function TaskDisplay({ title, description, collectionId, uid, taskId, setTaskData }) {
    const [inputing, setInputing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleSetValue = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.trim().length === 0) {
            title = 'Untitled';
        }

        setTaskData({ title, description }).then(() => {
            if (collectionId) {
                setDoc(doc(firestore, 'datas', uid, 'todo-lists', collectionId, 'tasks', taskId),
                    { title, description }, { merge: true });
            }
        });
        setInputing(false);
    }

    if (inputing) {
        return (
            <div className="relative space-y-2 border-2 border-blue-200 rounded-md p-2">
                <div className="absolute right-2 flex space-x-1">
                    <button onClick={handleSetValue}>
                        <CheckIcon className="w-4 h-4 text-green-500 hover:text-green-400" />
                    </button>
                    <button onClick={() => setInputing(false)}>
                        <XIcon className="w-4 h-4 text-red-500 hover:text-green-400" />
                    </button>
                </div>
                <input ref={titleRef} autoFocus type="text" defaultValue={title} className="w-full outline-none text-2xl font-medium " placeholder="title" />
                <textarea ref={descriptionRef} rows="2" className="w-full min-h-fit outline-none text-md text-gray-500 resize-none"
                    placeholder="description" defaultValue={description}>
                </textarea>
            </div>
        );
    }

    return (
        <div className="group relative space-y-2">
            <div className="absolute right-2 ">
                <button className="outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                    <PencilIcon onClick={() => setInputing(true)} className="h-4 w-4 text-gray-500 hover:text-gray-400" />
                </button>
            </div>
            <h2 className='text-2xl font-medium leading-6 text-gray-900'>
                {title}
            </h2>
            <p className='text-md text-gray-500'>
                {description}
            </p>
        </div>
    );
}

export default function TaskDetail() {
    const [isOpen, setIsOpen] = useState(true);
    const { user } = useRequireAuth();
    const { collectionId, taskId } = useParams();

    const isNormalTaskBoard = collectionId === 'today' || collectionId === 'upcoming' || collectionId === 'archived';

    const navigate = useNavigate();

    const getTask = useCallback(() => {
        if (isNormalTaskBoard) {
            return doc(firestore, 'uncategoried', user.uid, 'todo-lists', taskId)
        } else {
            return doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId)
        }
    }, [collectionId, isNormalTaskBoard, taskId, user.uid]);

    const setTaskData = useCallback((data) => {
        if (isNormalTaskBoard) {
            return setDoc(doc(firestore, 'uncategoried', user.uid, 'todo-lists', taskId), data, { merge: true })
        } else {
            return setDoc(doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId)
                , data, { merge: true })
        }
    }, [collectionId, isNormalTaskBoard, taskId, user.uid]);

    const [data, loading, error] = useDocument(getTask());

    if (loading) {
        return null;
    }

    const { title, description } = data.data();

    const closeModal = () => {
        setIsOpen(false);
        navigate(`/dashboard/${collectionId}`);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-lg 
                            bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4'>
                                <TaskDisplay title={title} collectionId={data.data().collectionId}
                                    uid={user.uid} taskId={taskId} description={description} setTaskData={setTaskData} />
                                <SubTask collectionId={data.data().collectionId} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
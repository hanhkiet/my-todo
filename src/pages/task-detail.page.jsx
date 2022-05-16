import { Transition, Dialog } from "@headlessui/react";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/outline";
import { doc, setDoc } from "firebase/firestore";
import { useState, Fragment, useCallback, useRef } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";

function SubTask() {
    return <div className="flex items-center space-x-2">
        <button className="outline-none">
            <CheckCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
        <div className="space-y-1">
            <SubTaskDisplay title="title" description="description" />
        </div>
    </div>
}

function SubTaskDisplay({ title, description }) {
    const [inputing, setInputing] = useState(false);

    if (inputing) {
        return (
            <div>
                <input autoFocus type="text" defaultValue={title} placeholder="title" className="w-full text-md outline-none" />
                <textarea rows="1" className="w-full text-sm min-h-fit outline-none resize-none"
                    placeholder="description" defaultValue={description}>
                </textarea>
                <div className="space-x-3">
                    <button className="bg-blue-500 hover:bg-blue-400 outline-none px-2 py-1 rounded-md text-white">Save</button>
                    <button onClick={() => setInputing(false)} className="bg-gray-200 hover:bg-gray-100 outline-none px-2 py-1 rounded-md">Cancel</button>
                </div>
            </div >
        );
    }

    return (
        <div onClick={() => setInputing(true)}>
            <h4 className="text-md">{title}</h4>
            <p className="text-sm">{description}</p>
        </div>
    );
}

function TaskDisplay({ title, description, setTaskData }) {

    const [inputing, setInputing] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const handleSetValue = () => {
        let title = titleRef ? titleRef.current.value : null;
        let description = descriptionRef ? descriptionRef.current.value : null;

        if (!title || title.length === 0) {
            title = 'Untitled';
        }

        setTaskData({ title, description });
        setInputing(false);
    }

    if (inputing) {
        return (
            <div className="space-y-2 border-2 border-blue-200 rounded-md p-2">
                <input ref={titleRef} autoFocus type="text" defaultValue={title} className="w-full outline-none text-2xl font-medium " placeholder="title" />
                <textarea ref={descriptionRef} rows="2" className="w-full min-h-fit outline-none text-md text-gray-500 resize-none"
                    placeholder="description" defaultValue={description}>
                </textarea>
                <div className="space-x-3">
                    <button onClick={handleSetValue} className="bg-blue-500 hover:bg-blue-400 outline-none px-2 py-1 rounded-md text-white">Save</button>
                    <button onClick={() => setInputing(false)} className="bg-gray-200 hover:bg-gray-100 outline-none px-2 py-1 rounded-md">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2" onClick={() => setInputing(true)}>
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

    const navigate = useNavigate();

    const getTask = useCallback(() =>
        doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId)
        , [collectionId, taskId, user.uid]);

    const setTaskData = useCallback((data) =>
        setDoc(doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId), data, { merge: true })
        , [collectionId, taskId, user.uid]);

    const [data, loading, error] = useDocument(getTask());

    if (loading) {
        return <p>Loading...</p>;
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
                                <TaskDisplay title={title} description={description} setTaskData={setTaskData} />
                                <div className="space-y-2">
                                    <h3 className="text-md font-semibold">Subtask</h3>
                                    <ul className="space-y-3 overflow-y-scroll">
                                        <li><SubTask /></li>
                                        <li><SubTask /></li>
                                        <li>
                                            <button className="flex items-center space-x-2 outline-none">
                                                <PlusIcon className="h-5 w-5" />
                                                <span className="text-md">Add task</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
import { Transition, Dialog } from "@headlessui/react";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/outline";
import { doc } from "firebase/firestore";
import { useState, Fragment, useCallback } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";

function SubTask() {

    const [inputing, setInputing] = useState(false);

    return <div className="flex items-center space-x-2">
        <button className="outline-none">
            <CheckCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
        <div className="space-y-1" onClick={() => setInputing(true)}>
            {
                inputing
                    ? <SubTaskInput title="title" description="description" />
                    : <SubTaskDisplay title={"title"} description={"description"} />
            }
        </div>
    </div>
}

function SubTaskInput({ title, description }) {
    return (
        <>
            <input type="text" defaultValue={title} placeholder="title" className="w-full text-md outline-none" />
            <textarea rows="1" className="w-full text-sm min-h-fit outline-none resize-none"
                placeholder="description" defaultValue={description}>
            </textarea>
            <div className="space-x-3">
                <button className="bg-blue-500 hover:bg-blue-400 outline-none px-2 py-1 rounded-md text-white">Save</button>
                <button className="bg-gray-200 hover:bg-gray-100 outline-none px-2 py-1 rounded-md">Cancel</button>
            </div>
        </>
    );
}

function SubTaskDisplay({ title, description }) {
    return (
        <>
            <h4 className="text-md">{title}</h4>
            <p className="text-sm">{description}</p>
        </>
    );
}

function TaskInput({ title, description, setInputing }) {

    return <>
        <input autoFocus type="text" defaultValue={title} className="w-full outline-none text-2xl font-medium " placeholder="title" />
        <textarea name="" rows="2" className="w-full min-h-fit outline-none text-md text-gray-500 resize-none"
            placeholder="description" defaultValue={description}>
        </textarea>
        <div className="space-x-3">
            <button className="bg-blue-500 hover:bg-blue-400 outline-none px-3 py-1.5 rounded-md text-white">Save</button>
            <button onClick={() => setInputing(false)} className="bg-gray-200 hover:bg-gray-100 outline-none px-3 py-1.5 rounded-md">Cancel</button>
        </div>
    </>
}

function TaskDisplay({ title, description }) {
    return (
        <>
            <h2 className='text-2xl font-medium leading-6 text-gray-900'>
                {title}
            </h2>
            <p className='text-md text-gray-500'>
                {description}
            </p>
        </>
    );
}

export default function TaskDetail() {
    const [isOpen, setIsOpen] = useState(true);
    const { user } = useRequireAuth();
    const { collectionId, taskId } = useParams();
    const [inputing, setInputing] = useState(false);

    const navigate = useNavigate();

    const getTask = useCallback(() =>
        doc(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks', taskId)
        , [collectionId, taskId, user.uid]);

    const [data, loading, error] = useDocument(getTask());

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log(data);

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
                                <div className="space-y-2" onClick={() => setInputing(true)}>
                                    {
                                        inputing
                                            ? <TaskInput title={title} description={description} setInputing={setInputing} />
                                            : <TaskDisplay title={title} description={description} />
                                    }
                                </div>
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
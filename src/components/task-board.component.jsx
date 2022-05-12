import { collection } from "firebase/firestore";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";
import { useDocument } from 'react-firebase-hooks/firestore';
import Task from "./task.component";
import { PlusCircleIcon } from "@heroicons/react/outline";

export default function TaskBoard() {

    const { user } = useRequireAuth();

    const [inputing, setInputing] = useState(false);

    const { collectionId } = useParams();

    const getTasks = useCallback(() =>
        collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks')
        , [collectionId, user.uid]);

    const [data, loading, error] = useDocument(getTasks());

    if (loading) {
        return <div className="w-full h-fit px-32 lg:px48 xl:px-60 py-6 z-1 flex items-center justify-center">
            <i className="fa-solid fa-check-double text-xl text-blue-600"></i>
        </div>;
    }

    const lists = data.docs.map((doc) => {
        return <li key={doc.id}>
            <Task {...doc.data()} />
        </li>
    });

    return (
        <div className='w-full h-fit px-32 lg:px-48 xl:px-60 py-6 z-1'>
            <ul className="space-y-4">
                {lists}
                <li id='create'>
                    <div className="py-2 rounded-md space-y-1">
                        <div className="group flex items-center space-x-3">
                            <PlusCircleIcon className="h-5 w-5 text-blue-300 group-hover:text-blue-500" />
                            <p className="text-xl text-gray-300 group-hover:text-gray-500">New task</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
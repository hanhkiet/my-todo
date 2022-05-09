import { collection } from "firebase/firestore";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";
import { useDocument } from 'react-firebase-hooks/firestore';
import Task from "./task.component";

export default function TaskBoard() {

    const { user } = useRequireAuth();

    const { collectionId } = useParams();

    const getTasks = useCallback(() =>
        collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks')
        , [collectionId, user.uid]);

    const [data, loading, error] = useDocument(getTasks());

    if (loading) {
        return <p>Loading...</p>;
    }

    const lists = data.docs.map((doc) => {
        return <li key={doc.id}>
            <Task {...doc.data()} />
        </li>
    });

    return (
        <div className='w-full h-fit px-32 lsg:px-48 xl:px-60 py-6 z-1'>
            <ul className="space-y-6">
                {lists}
            </ul>
        </div>
    );
}
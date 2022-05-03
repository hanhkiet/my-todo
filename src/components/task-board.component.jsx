import { collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import useRequireAuth from "../hooks/useRequireAuth";
import Task from "./task.component";

export default function TaskBoard() {

    const { user } = useRequireAuth();

    const { collectionId } = useParams();

    console.log(collectionId);

    const getTasks = useCallback(() =>
        getDocs(collection(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks'))
        , [user.uid, collectionId]);

    console.log(getTasks.toString());

    const { data, status, error } = useFirestoreQuery(getTasks(collectionId));

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    console.log(data);

    const tasks = data.map((task) => {
        return <li key={task.id}>
            <Task title={task.title} description={task.description} />
        </li>;
    });

    return (
        <div className='w-full h-fit px-16 lg:px-32 xl:px-48 py-6 space-y-4 z-1'>
            <ul>
                {tasks}
            </ul>
        </div>
    );
}
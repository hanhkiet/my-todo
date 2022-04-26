import { useParams } from "react-router-dom";
import useRequireAuth from "../hooks/useRequireAuth";

export default function TaskBoard() {

    const { user } = useRequireAuth();

    const { collectionId } = useParams();

    console.log(user.uid, collectionId);

    // const { data, status, error } = useFirestoreQuery(
    // getDocs(firestore, 'datas', user.uid, 'todo-lists', collectionId, 'tasks'));

    // if (status === 'success') {
    //     console.log(data);
    // }

    return (
        <div className='w-full flex flex-wrap justify-around gap-6 p-2 z-1'>

        </div>
    );
}
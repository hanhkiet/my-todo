import { CalculatorIcon, HeartIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import useRequireAuth from "../hooks/useRequireAuth";

const styles = 'transition-colors duration-100 hover:bg-blue-100 hover:drop-shadow-sm' +
    'focus:bg-blue-100 focus:drop-shadow-sm py-2 px-3 rounded-md outline-none flex items-center space-x-3';

export default function TodoList({ showDetail }) {

    const { user } = useRequireAuth();

    const { data, status, error } = useFirestoreQuery(getDocs(collection(firestore, 'datas', user.uid, 'todo-lists')));

    if (status === 'loading') {
        return <p>Loading</p>;
    }


    return (
        <>
            <ul className={`space-y-1 flex flex-col pb-2 border-b-2 border-b-gray-400 ${showDetail ? null : 'items-center'}`}>
                {/* todo lists item default */}
                <li >
                    <Link to='today' className={`${styles} ${showDetail ? 'w-full' : null}`}>
                        <CalculatorIcon className='h-6 w-6 text-blue-500' />
                        {showDetail ? <p>Today</p> : null}
                    </Link>
                </li>
                <li>
                    <Link to='favorites' className={`${styles} ${showDetail ? 'w-full' : null}`}>
                        <HeartIcon className='h-6 w-6 text-blue-500' />
                        {showDetail ? <p>Favorites</p> : null}
                    </Link>
                </li>
                <li>
                    <Link to='streaks' className={`${styles} ${showDetail ? 'w-full' : null}`}>
                        <TrendingUpIcon className='h-6 w-6 text-blue-500' />
                        {showDetail ? <p>Streaks</p> : null}
                    </Link>
                </li>
            </ul>
            {/* todo list of user */}
            <ul className={`space-y-1 flex flex-col ${showDetail ? null : 'items-center'}`}>
                {
                    data.docs.map((doc) => (
                        <li key={doc.id}>
                            <Link to={doc.id} className={`${styles} ${showDetail ? 'w-full' : null}`}>
                                <HeartIcon className='h-6 w-6 text-blue-500' />
                                {showDetail ? <p>{doc.data().name}</p> : null}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}
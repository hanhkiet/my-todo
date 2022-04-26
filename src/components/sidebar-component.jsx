import React from "react";
import UserBar from "./user-bar.component";
import Collection from "./collection.component";
import useRequireAuth from "../hooks/useRequireAuth";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export default function SideBar({ showDetail = true }) {

    const { user } = useRequireAuth();

    const { data: lists, status, error } = useFirestoreQuery(
        getDocs(collection(firestore, 'datas', user.uid, 'todo-lists')));

    if (error) {
        console.log(error);
    }

    return (
        <div className='bg-blue-200 space-y-3 drop-shadow-md p-2 z-10'>
            <UserBar showDetail={showDetail} />
            {
                status === 'success'
                    ? <Collection showDetail={showDetail} data={lists} />
                    : null
            }

        </div >
    );
}
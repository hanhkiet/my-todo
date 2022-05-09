import React, { useCallback } from "react";
import UserBar from "./user-bar.component";
import Collection from "./collection.component";
import useRequireAuth from "../hooks/useRequireAuth";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { useSidebar } from "../context/SidebarContext";
import { useCollection } from 'react-firebase-hooks/firestore';

const sidebar_style = 'bg-blue-200 space-y-3 drop-shadow-md p-2 z-10';


export default function SideBar() {

    const { showSidebar } = useSidebar();
    const { user } = useRequireAuth();

    const addList = (data) => addDoc(collection(firestore, 'datas', user.uid, 'todo-lists'), data);

    const [data, loading, err] = useCollection(collection(firestore, 'datas', user.uid, 'todo-lists'));

    const handleAddList = useCallback((data) => {
        addList(data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const lists = data.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });

    return (
        <div className={sidebar_style}>
            <UserBar showDetail={showSidebar} />
            <Collection lists={lists} addList={handleAddList} />
        </div >
    );
}
import React, { useCallback } from "react";
import UserBar from "./user-bar.component";
import Collection from "./collection.component";
import useRequireAuth from "../hooks/useRequireAuth";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useSidebar } from "../context/SidebarContext";

const sidebar_style = 'bg-blue-200 space-y-3 drop-shadow-md p-2 z-10';


export default function SideBar() {

    const { showSidebar } = useSidebar();
    const { user } = useRequireAuth();

    const getLists = () => getDocs(collection(firestore, 'datas', user.uid, 'todo-lists'));
    const addList = (data) => addDoc(collection(firestore, 'datas', user.uid, 'todo-lists'), data);

    const { data, status, error, update } = useFirestoreQuery(getLists(user.uid));

    const handleAddList = useCallback((data) => {
        addList(data).then((response) => {
            update({ id: response.id, name: data.name });
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div className={sidebar_style}>
            <UserBar showDetail={showSidebar} />
            {
                status === 'success' || 'updated'
                    ? <Collection lists={data} addList={handleAddList} />
                    : null
            }
        </div >
    );
}
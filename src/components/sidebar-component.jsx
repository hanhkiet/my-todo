import React, { useCallback } from "react";
import UserBar from "./user-bar.component";
import Collection from "./collection.component";
import useRequireAuth from "../hooks/useRequireAuth";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useSidebar } from "../context/SidebarContext";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from "react-router-dom";

const sidebar_style = 'bg-blue-200 space-y-3 drop-shadow-md p-2 z-10 basis-1/7';

export default function SideBar() {

    const { showSidebar } = useSidebar();
    const navigate = useNavigate();
    const { user } = useRequireAuth();

    const addList = useCallback((data) =>
        addDoc(collection(firestore, 'datas', user.uid, 'todo-lists'), data)
        , [user.uid]);

    const deleteList = useCallback((id) =>
        deleteDoc(doc(firestore, 'datas', user.uid, 'todo-lists', id))
        , [user.uid]);

    const changeDataList = useCallback((id, data) =>
        setDoc(doc(firestore, 'datas', user.uid, 'todo-lists', id), data, { merge: true })
        , [user.uid]);

    const [data, loading, err] = useCollection(collection(firestore, 'datas', user.uid, 'todo-lists'));

    const handleAddList = useCallback((data) => {
        addList(data).then((response) => {
            navigate(response.id);
        }).catch((error) => {
            console.log(error);
        })
    }, [addList, navigate]);

    const handleDeleteList = useCallback((id) => {
        deleteList(id).then((response) => {
            console.log(response);
        }).then(() => {
            navigate('/dashboard');
        })
            .catch((error) => {
                console.log(error);
            });
    }, [deleteList, navigate]);

    const handleChangeDataList = useCallback((id, data) => {
        changeDataList(id, data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [changeDataList]);

    if (loading) {
        return <div className={sidebar_style}>
            <i className="fa-solid fa-check-double text-xl text-blue-600"></i>
        </div>
    }

    const lists = data.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        };
    }).sort((a, b) => {
        return a.created.seconds - b.created.seconds;
    });

    return (
        <div className={sidebar_style}>
            <UserBar showDetail={showSidebar} />
            {loading
                ? <i className="fa-solid drop-shadow-lg fa-check-double text-xl text-blue-600"></i>
                : <Collection lists={lists} addList={handleAddList}
                    deleteList={handleDeleteList} changeDataList={handleChangeDataList} />
            }
        </div >
    );
}
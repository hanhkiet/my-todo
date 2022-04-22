import React, { useEffect } from 'react';
import useRequireAuth from '../hooks/useRequireAuth';
import SideBar from '../components/sidebar-component';
import MainBoard from '../components/main-board.component';
import useToggle from '../hooks/useToggle';
import { useFirestoreQuery } from '../hooks/useFirestoreQuery';
import { firestore } from '../firebase';

export default function Dashboard() {

    const [showSidebar, setShowSidebar] = useToggle(true);

    const { user } = useRequireAuth();


    if (!user) {
        return <h1>Loading...</h1>
    }

    console.log(user.uid);

    return <div className=' h-screen w-screen flex'>
        <SideBar showDetail={showSidebar} />
        <MainBoard toggleSidebar={setShowSidebar} />
    </div>;
}
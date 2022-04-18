import React from 'react';
import useRequireAuth from '../hooks/useRequireAuth';
import SideBar from '../components/sidebar-component';
import MainBoard from '../components/main-board.component';
import useToggle from '../hooks/useToggle';
import { firestore } from '../firebase';
import useFirestoreQuery from '../hooks/useFirestoreQuery';

export default function Dashboard() {

    const [showSidebar, setShowSidebar] = useToggle(true);

    const { user } = useRequireAuth();

    if (!user) {
        return <h1>Loading...</h1>
    }

    console.log('render dashboard');

    return <div className=' h-screen w-screen flex'>
        <SideBar showDetail={showSidebar} />
        <MainBoard toggleSidebar={setShowSidebar} />
    </div>;
}
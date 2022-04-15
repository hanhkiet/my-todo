import React, { useState } from 'react';
import useRequireAuth from '../hooks/use-require-auth';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/sidebar-component';
import MainBoard from '../components/main-board.component';

export default function Dashboard() {

    const [showDetail, setShowDetail] = useState(false);

    const { user, signout } = useRequireAuth();

    if (!user) {
        return <h1>Loading...</h1>
    }

    const handleSignout = () => {
        signout().then(() => <Navigate to='/signin' />);
    }

    console.log('render dashboard');

    return <div className=' h-screen w-screen flex'>
        <SideBar showDetail={showDetail} />
        <MainBoard />
    </div>;
}
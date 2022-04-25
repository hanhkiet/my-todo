import React from 'react';
import useRequireAuth from '../hooks/useRequireAuth';
import SideBar from '../components/sidebar-component';
import MainBoard from '../components/main-board.component';
import useToggle from '../hooks/useToggle';
import { useParams } from 'react-router-dom';

export default function Dashboard() {

    const [showSidebar, setShowSidebar] = useToggle(true);

    const { user } = useRequireAuth();

    const { collectionId } = useParams();

    if (!user) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='h-screen w-screen flex flex-row'>
            <SideBar showDetail={showSidebar} />
            {
                collectionId ? <MainBoard toggleSidebar={setShowSidebar}
                    collectionId={collectionId} /> : null
            }
        </div>
    );
}
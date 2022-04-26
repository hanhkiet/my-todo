import React, { useEffect } from 'react';
import useRequireAuth from '../hooks/useRequireAuth';
import SideBar from '../components/sidebar-component';
import useToggle from '../hooks/useToggle';
import FunctionBar from '../components/function-bar.component';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function Dashboard() {

    const [showSidebar, setShowSidebar] = useToggle(true);

    const { user } = useRequireAuth();

    const { collectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!collectionId) {
            navigate('today');
        }
    }, []);

    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='h-screen w-screen flex flex-row'>
            <SideBar showDetail={showSidebar} />
            <div className='grow bg-slate-100 space-y-2 z-1 overflow-y-auto'>
                <FunctionBar toggleSidebar={setShowSidebar} />
                <Outlet />
            </div>
        </div>
    );
}
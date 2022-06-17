import React from 'react';
import useRequireAuth from '../hooks/useRequireAuth';
import SideBar from '../components/sidebar-component';
import FunctionBar from '../components/function-bar.component';
import { Outlet, useNavigate } from 'react-router-dom';
import { ProvideSidebar } from '../context/SidebarContext';
import { ProvideSearchContent } from '../context/SearchContentContext';

export default function Dashboard() {

    const { user } = useRequireAuth();
    const navigate = useNavigate();

    if (!user) {
        return <p>Loading...</p>;
    }


    return (
        <ProvideSidebar>
            <div className='h-screen w-screen flex flex-row'>
                <SideBar />
                <div className='grow space-y-2 z-1 overflow-y-auto'>
                    <ProvideSearchContent>
                        <FunctionBar />
                        <Outlet />
                    </ProvideSearchContent>
                </div>
            </div >
        </ProvideSidebar>
    );
}
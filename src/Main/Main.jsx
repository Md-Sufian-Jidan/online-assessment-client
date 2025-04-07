import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Main = () => {
    return (
        <div className='bg-white dark:bg-gray-900 text-black min-h-screen'>
            <div className='h-20'>
                <Navbar />
            </div>
            <div className='min-h-[calc(100vh-360px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
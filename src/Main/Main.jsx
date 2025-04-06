import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Main = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="h-20">
                <Navbar />
            </div>
            {/* <div className='min-h-[calc(100vh-410px)]'> */}
                <Outlet />
            {/* </div> */}
            <Footer />
        </div>
    );
};

export default Main;
import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Componenet/Header/Nav';
import Footer from '../Componenet/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;
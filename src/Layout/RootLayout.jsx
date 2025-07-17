import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Componenet/Header/Nav';

const RootLayout = () => {
    return (
        <div>
            <Nav/>
            <Outlet/>
        </div>
    );
};

export default RootLayout;
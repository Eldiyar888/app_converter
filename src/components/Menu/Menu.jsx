import React from 'react';
import Path from '../Path/Path';
import {Outlet} from "react-router-dom";

const Menu = () => {
    return (
        <>
            <Path />
            <Outlet />
        </>
    );
};

export default Menu;
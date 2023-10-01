import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ListView from '../pages/ListView';
import AddView from '../pages/AddView';
import DetailsView from '../pages/DetailsView';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import { Navbar } from '../component/Navbar';

const AppRoutes = () => {
    const location = useLocation();

    // Conditionally render the Navbar based on the current location
    const shouldRenderNavbar = !['/', '/signup'].includes(location.pathname);

    return (
        <div>
            {shouldRenderNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="detailview" element={<DetailsView />} />
                <Route path="addview" element={<AddView />} />
                <Route path="listview" element={<ListView />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;

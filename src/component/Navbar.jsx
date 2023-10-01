import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshTokenKey, accessTokenKey } from "../constants/storageconstants";
import { removeLocalStorage } from "../utility/storageutility";
import { setLogoutUserAct } from "../store/auth/authslice";
import { useNavigate } from 'react-router-dom';
import {ReactComponent as ProfileIcon} from '../assets/user-profile.svg'; 


import '../scss/navbar.css';

export const Navbar = () => {

    const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeLocalStorage(refreshTokenKey);
    removeLocalStorage(accessTokenKey);
    dispatch(setLogoutUserAct(undefined));
    navigate('/');
  };

    return (
        <nav className="navbar">
            <div className="container navbar-items">
                <div className="brand">
                    <a href="/listview">My Tasky</a>
                </div>
                <div className="menu">
                    <ul>
                        <li><button type="button" className="btn btn-warning w-100 rounded logout-button" onClick={handleLogout}>Logout</button></li>


                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

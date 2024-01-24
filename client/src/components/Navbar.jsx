/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    // const navigate = useNavigate()
    const loggedIn = props.loggedIn
    const setLoggedIn = props.setLoggedIn
    const logout = props.logout

    const id = localStorage.getItem('userID')
    const name = localStorage.getItem('name')
    return (
        <div className="navContainer"> 
                <div>
                    {loggedIn == true &&
                        <div className="Navbar"> 
                            <Link to="/user/list">
                                <h1>Users</h1>
                            </Link>
                            <Link to={{
                                pathname: `/user/${id}/profile`,
                                }}
                                >
                                <h1>Profile</h1>
                            </Link>
                            <button onClick={()=> logout()} className="logout">Logout</button>
                        </div>
                    }
                </div>
        </div>
  );
};

export default Navbar;

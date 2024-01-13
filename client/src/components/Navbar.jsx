/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate()
    const loggedIn = props.loggedIn
    const setLoggedIn = props.setLoggedIn
    const logout = async() => {
        await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": localStorage.getItem('refresh')})
        })
        .then((response) => {
            localStorage.clear()
            setLoggedIn(false)
            navigate('/login')
            return response.json()
        })
    }

    return (
        <div className="Navbar"> 
                <div>
                    {loggedIn == false &&
                        <div>
                            <Link to="/">
                                Home
                            </Link>      
                            <Link to="/user/create">
                                Sign Up!
                            </Link>  
                            <Link to="/login">
                                Login
                            </Link>
                        </div> 
                    }  
                    {loggedIn == true &&
                        <div>
                            <Link to="/">
                                Home
                            </Link>    
                            <button onClick={()=> logout()}>Logout</button>
                        </div>
                    }
                </div>
        </div>
  );
};

export default Navbar;

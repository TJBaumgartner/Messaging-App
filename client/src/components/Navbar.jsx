/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="Navbar"> 
                <div>
                    <Link to="/">
                        Home
                    </Link>      
                    <Link to="/user/create">
                    Sign Up!
                    </Link>     
                    <div>
                    <Link to="/login">
                        Login
                    </Link>
                    </div>
                </div>
        </div>
  );
};

export default Navbar;

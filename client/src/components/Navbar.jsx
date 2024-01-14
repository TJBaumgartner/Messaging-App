/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    // const navigate = useNavigate()
    const loggedIn = props.loggedIn
    const setLoggedIn = props.setLoggedIn
    const logout = props.logout

    return (
        <div className="Navbar"> 
                <div>
                    {loggedIn == true &&
                        <div> 
                            <Link to="/test">
                                Test
                            </Link>
                            <button onClick={()=> logout()}>Logout</button>
                        </div>
                    }
                </div>
        </div>
  );
};

export default Navbar;

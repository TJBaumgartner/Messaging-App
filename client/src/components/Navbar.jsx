/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    
    const logout = async() => {
        await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": localStorage.getItem('refresh')})
        })
        .then((response) => {
            localStorage.clear()
            navigate('/login')
            return response.json()
        })
    }
    
    
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if(localStorage.length > 0){
            setLoggedIn(true)
        }
    }, [loggedIn])

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

                    <button onClick={()=> logout()}>Logout</button>
                </div>
        </div>
  );
};

export default Navbar;

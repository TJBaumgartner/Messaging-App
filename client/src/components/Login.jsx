import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import '../App.css'

function Login(props) {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const logout = props.logout

    useEffect(() => {
        if(localStorage.length > 0) {
            logout()
            localStorage.clear()
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, password}
            fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(user)
            })
            .then((response) => {
                if(response.status === 400){
                    setPasswordError(false)
                    setPassword('')
                    return setUsernameError(true)
                }
                if(response.status === 403){
                    setUsernameError(false)
                    setPassword('')
                    return setPasswordError(true)
                }
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('access', data.accessToken);
                localStorage.setItem('refresh', data.refreshToken);
                localStorage.setItem('name', data.name);
                localStorage.setItem('userID', data.userId);
                props.setLoggedIn(true)
                navigate('/user/list');
            })
    }

    return (
        <div>
            <div>
                <h3>Need An Account?</h3>
                <Link to="/user/create">Sign Up</Link>
            </div>
            <form action="" method='POST' onSubmit={handleSubmit}>
                <input type="text" name='text' id="username" value={username} placeholder='Username/Email' onChange={(e) => setUsername(e.target.value)} required></input>
                <input type="password" placeholder="Password"name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button type='submit'>Log in</button>
            </form>
            {passwordError == true &&
                <h3>Password is not correct</h3>
            }
            {usernameError == true &&
                <h3>Username does not exist</h3>
            }
        </div>
    )
}

export default Login

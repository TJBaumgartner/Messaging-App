import { useState } from 'react'
import '../App.css'
import Navbar from './Navbar';

function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [matchPassword, setMatchPassword] = useState(null)
    const [userTaken, setUserTaken] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, password}
        if(password == confirmPassword){
            fetch('http://localhost:5000/api/user/create', {

                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(user)
            })
            .then((response) => {
                if(response.status === 400){
                    setPassword('')
                    return setUserTaken(true)
                }
                response.json()
                console.log(response)
            })
        } else {
            setMatchPassword(false)
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <form action="" method='POST' onSubmit={handleSubmit}>
                <input type="text" name='text' id="username" value={username} placeholder='Username/Email' onChange={(e) => setUsername(e.target.value)} required></input>
                <input type="password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <input type="password" name='confirmPassword' id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                <button type='submit'>Sign Up!</button>
            </form>
            {matchPassword === false &&
                <h2>Passwords must match</h2>
            }    
            {userTaken === true &&
                <h2>Username is taken</h2>
            }  
        </div>
    )
}

export default SignUp

import { useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Users() {
    const loggedUser = localStorage.getItem('userID')

    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/user/list', {        
            headers: {
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        .then((response) => {
            if(response.status === 401){
                console.log(localStorage)
                navigate('/login');
            }
            return response.json()
        })
        .then(data => setAllUsers(data))
    }, [])

    return (
        <>
            <Navbar></Navbar>
                {allUsers ?(
                allUsers.map((user) => (
                    (loggedUser == user._id) ?
                    null
                    :
                    <div  key={user._id}>
                    <Link to={{
                    pathname: `/user/${user._id}/message`,
                    }}
                    >
                    <h1>{user.username}</h1>
                    </Link>
                    </div>
                ))
                ) : (
                    <p>There are no users</p>
                )}
        </>
    )
}

export default Users

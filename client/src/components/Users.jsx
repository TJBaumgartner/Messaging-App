import { useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
function Users() {

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
                    <div key={user._id}>
                    <h1>{user.username}</h1>
                    {/* <Link to={{
                    pathname: `/blogger/posts/${post._id}`,
                    }}
                    >Detail</Link> */}
                    </div>
                ))
                ) : (
                    <p>There are no users</p>
                )}
        </>
    )
}

export default Users

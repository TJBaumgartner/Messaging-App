import { useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Profile() {

    const navigate = useNavigate()
    const {id} = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${id}/profile`, {        
            headers: {
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        .then((response) => {
            if(response.status === 401){
                navigate('/user/list')
            }
            return response.json()
        })
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className='profileContainer'>
                {/* <h1>{user.username}</h1>
                <ul>
                    <li>Bio: {user.bio}</li>
                    <li>About: {user.about}</li>
                </ul> */}
            </div>
        </>
    )
}

export default Profile

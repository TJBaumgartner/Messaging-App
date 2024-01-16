import {useEffect } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';

function UserChat() {

    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${id}/message`, {        
            headers: {
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        .then((response) => {
            if(response.status === 400){
                navigate('/user/list');
            }
            return response.json()
        })
        .then(data => console.log(data))
    }, [])

    return (
    <>
        <h1>Some User</h1>
    </>
  )
}

export default UserChat

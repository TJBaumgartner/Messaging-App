import {useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';

function UserChat() {

    const {id} = useParams()

    const [user, setUser] = useState()
    const [message, setMessage] = useState("")

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
        .then((data) => {
            setUser(data)
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        const recipient = user._id
        const sender = localStorage.getItem('userID')
        const data = {message, recipient, sender}
        fetch(`http://localhost:5000/api/message/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            console.log(response)
            setMessage('')
        })
    }    
    return (
    <>
        {user && 
            <h1>{user.username}</h1>
        }
        <form action="" method='POST' onSubmit={sendMessage}>
            <input type='text' id='message' value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button type='submit'>Send</button>
        </form>
    </>
  )
}

export default UserChat

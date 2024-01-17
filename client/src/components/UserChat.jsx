import {useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';

function UserChat() {
    const sender = localStorage.getItem('userID')

    const {id} = useParams()

    const [user, setUser] = useState()
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState()
    const [messagesLoaded, setMessagesLoaded] = useState(false)

    //Load message Recipient
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
            setMessagesLoaded(true)
        })
    }, [])

    //Load All Messages
    useEffect(() => {
        if(messagesLoaded == true){
            const recipient = user._id
            const sender = localStorage.getItem('userID')
            const data = { recipient, sender}
            fetch(`http://localhost:5000/api/user/${id}/allMessages`, {   
                method: 'POST',     
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access')
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setAllMessages(data)
            })        }
    }, [messagesLoaded])

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
        {allMessages ?(
            allMessages[1].map((message) => (
                <div  key={message._id}>
                    <h1>{message.message}</h1>
                </div>
            )),
            allMessages[0].map((message) => (
                <div  key={message._id}>
                    <h1>{message.message}</h1>
                </div>
            ))
        ) : (
            <p>There are no messages</p>
        )}
        <form action="" method='POST' onSubmit={sendMessage}>
            <input type='text' id='message' value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button type='submit'>Send</button>
        </form>
    </>
  )
}

export default UserChat

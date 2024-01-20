import {useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
import moment from "moment";    

function UserChat() {
    const sender = localStorage.getItem('userID')

    const {id} = useParams()

    const [user, setUser] = useState()
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState()
    const [messagesLoaded, setMessagesLoaded] = useState(false)
    const [sentMessage, setSentMessage] = useState(false)

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
            if(response.status === 401){
                navigate('/login');
            }
            return response.json()
        })
        .then((data) => {
            setUser(data)
            setMessagesLoaded(true)
        })
    }, [])

    useEffect(() => {
            loadMessages()
    }, [messagesLoaded, sentMessage])

    //Load All Messages
    const loadMessages = () => {
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
                return response.json()
            })
            .then((data) => {
                setAllMessages(data)
                console.log(data)
            })        
        }
    }

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
            setMessage('')
            setSentMessage(true)
            return response.json()
        })
    }    

    const MessageBy = (message) => {

    }
    return (
    <>
        {user && 
            <h1>{user.username}</h1>
        }
        <div className='chatMessages'>
            {allMessages &&
                allMessages.map((message) => (
                    (message.fromUser == sender) ?
                    <div className='sender' key={message._id}>
                        <span>{moment(message.createdAt, 'YYYY-MM-DD hh:mm:ss').format('MM-DD-YYYY')}</span>            
                        <h1>{message.message}</h1>
                    </div>                    
                    :
                    <div className='recipient' key={message._id}>
                        <span>{moment(message.createdAt, 'YYYY-MM-DD hh:mm:ss').format('MM-DD-YYYY')}</span>            
                        <h1>{message.message}</h1>
                    </div>
                ))
            }
        </div>
        <form action="" method='POST' onSubmit={sendMessage}>
            <input type='text' id='message' value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button type='submit'>Send</button>
        </form>
    </>
  )
}

export default UserChat

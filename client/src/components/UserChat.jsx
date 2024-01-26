import {useEffect, useState } from 'react'
import '../App.css'
import { Link, useParams } from 'react-router-dom';
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
        setSentMessage(false)
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

    return (
    <div className='messageContainer'>
        {user && 
            <Link to={`/user/${id}/profile`}>
                <h1>{user.username}</h1>
            </Link>
        }
        <div className='chatMessages'>
            {allMessages &&
                allMessages.map((message) => (
                    (message.fromUser == sender) ?
                    <div className='chatContainerS' key={message._id}>
                        <div className='sender'>
                            <span>{user.username} {moment(message.createdAt, 'YYYY-MM-DD hh:mm:ss').format('MM/DD/YYYY')}</span>            
                            <p>{message.message}</p>
                        </div>
                    </div>                    
                    :
                    <div className='chatContainerR' key={message._id}>
                        <div className='recipient'>
                            <span>{localStorage.getItem('name')} {moment(message.createdAt, 'YYYY-MM-DD hh:mm:ss').format('MM/DD/YYYY')}</span>            
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <form action="" method='POST' onSubmit={sendMessage} className='chatForm'>
            <input type='text' id='message' value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default UserChat

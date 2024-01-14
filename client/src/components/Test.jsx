import { useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
function Test() {

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5000/api/test', {        
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
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <h1>Test</h1>
        </>
    )
}

export default Test

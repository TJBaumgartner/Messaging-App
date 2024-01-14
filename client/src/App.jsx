import './App.css'
import React, {useEffect, useState} from 'react'
import {Route, Routes } from 'react-router-dom';
import Index from './components/Index'
import ErrorPage from './components/ErrorPage'
import Signup from './components/SignUp'
import Login from './components/Login'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Test from './components/Test';

function App() {      

  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  
  useEffect(() => {
    setInterval(async () => {
        fetch('http://localhost:5000/api/token', {        
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "token": localStorage.getItem('refresh')
            })
        })
        .then((response) => {
            if(response.status === 401){
                console.log(localStorage)
                  localStorage.clear()
                  navigate('/login');
            }
            return response.json()
        })
        .then((data) => {
          console.log(data)
          localStorage.setItem('access', data.accessToken);
        })
    },18000)
  }, [])
  
  const logout = async() => {
    await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"token": localStorage.getItem('refresh')})
    })
    .then((response) => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login')
        return response.json()
    })
}

  return (
    <div>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout}/>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} logout={logout}/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/user/create" element={<Signup/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </div>
  )
}

export default App

import './App.css'
import React, {useEffect, useState} from 'react'
import {Route, Routes } from 'react-router-dom';
import Index from './components/Index'
import ErrorPage from './components/ErrorPage'
import Signup from './components/SignUp'
import Login from './components/Login'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate()
    
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
      
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
          <Route path="/user/create" element={<Signup/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </div>
  )
}

export default App

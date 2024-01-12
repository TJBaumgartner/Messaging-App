import './App.css'
import React, {useEffect, useState} from 'react'
import {Route, Routes } from 'react-router-dom';
import Index from './components/Index'
import ErrorPage from './components/ErrorPage'
import Signup from './components/SignUp'
import Login from './components/Login'
import Navbar from './components/Navbar';

function App() {

  return (
    <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/user/create" element={<Signup/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </div>
  )
}

export default App

import { useState } from 'react'
import '../App.css'
import Navbar from './Navbar'
function ErrorPage() {

  return (
    <>
        <Navbar></Navbar>
        <h1>Error 404</h1>
        <h2>Page does not Exist</h2>
    </>
  )
}

export default ErrorPage

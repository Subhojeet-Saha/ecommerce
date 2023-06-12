import React from 'react'
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer'>
      <h4 className='text-center'>
      All Right Reserved &copy; R.V.S
      </h4>
      <p className='text-center mt-3'>
      <Link to="/about">About</Link>|
      <Link to="/contact">Contact</Link>|
      <Link to="/policy">Privacy Policy</Link>
      </p>

    </div>
  )
}

export default Footer
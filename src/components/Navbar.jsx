import React, { useContext } from 'react'
import Logo from "/Screenshot__41_-removebg-preview.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <img src={Logo} alt=""/>
          </Link>
        </div>
        <div className='links'>
          {currentUser && <Link className='link' to="/profile">
            <span className='write2'>Profile</span>
          </Link>}
          {currentUser ? 
            <span className='write2' onClick={logout}>Logout</span> 
          : 
            <Link className='link write2' to="/login">Login</Link>
          }
          <Link className='link' to="/write">
            <span className='write'>Write</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
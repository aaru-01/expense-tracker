import React from 'react'
import { useState, useEffect } from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
    setUser(storageUser);
  }, [])
  return (
    <div className='Navbar-container'>


      <Link to="/login" className='heading-expense-traker'>Expense <span className='tracker-text'>Tracker</span></Link>

      <p className='navbar-menu'>
        <Link to="/login" className='menu-list'>Login</Link>
        <Link to="/signup" className='menu-list'>Signup</Link>
        <Link to="/addtransaction" className='menu-list'>Add Transaction</Link>
        <Link to="/" className='menu-list'>All Transaction</Link>
      </p>
      <p className='navbar-user-container'>
        Hello, {user.name || "User!"}

        {
          user.name ? (
            <span className='navbar-logout' onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}> Logout </span>
          )
            : null
        }
      </p>
    </div>

  )
}

export default Navbar

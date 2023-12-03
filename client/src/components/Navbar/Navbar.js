import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='main-navbar-container'>
     <h1 className='heading-expense-traker'>Expense <span className='tracker-text'>Tracker</span></h1>
     <hr/>
     <p className='navbar-menu'>
        <Link to= "/login" className='menu-list'>Login</Link>
        <Link to= "/signup" className='menu-list'>Signup</Link>
        <Link to= "/" className='menu-list'>All Transaction</Link>
     </p>
    </div>
  )
}

export default Navbar

import React from 'react'
import CompareFlats from './CompareFlats'
import Home from './Home'
import Login from './Login'
import Register from './Register'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='nav-container'>
            <div className='site-logo'>JFC Housing</div>
            <ul className='nav-items'>
                <li className='nav-link'>
                    <Home/>
                </li>
                <li className='nav-link'>
                    <CompareFlats/>
                </li>
                <li className='nav-link'>
                    <Login/>
                </li>
                <li className='nav-link'>
                    <Register/>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
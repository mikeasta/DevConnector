import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <h2><i class="fas fa-code"></i> DevConnector</h2>
            <nav>
                <a href='#' className='navbar-link'>Developers</a>
                <a href='#' className='navbar-link'>Register</a>
                <a href='#' className='navbar-link'>Login</a>
            </nav>
        </div>
    )
};

export default Navbar;

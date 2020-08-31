import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/' className='navbar-h1'><h1><i class="fas fa-code"></i> DevConnector </h1></Link>
            <nav>
                <Link to='#' className='navbar-link'>Developers</Link>
                <Link to='/register' className='navbar-link'>Register</Link>
                <Link to='/login' className='navbar-link'>Login</Link>
            </nav>
        </div>
    )
};

export default Navbar;

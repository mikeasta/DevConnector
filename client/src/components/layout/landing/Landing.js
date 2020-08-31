import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
    return (
        <div className='landing'>
            <div className='wrapper'>
                <h1>
                    Welcome to DevConnector 
                </h1>
                <h4>
                    Social network for devs
                </h4>
                <nav>
                    <Link to='/register' className='landing-link'> Sign up </Link>
                    <Link to='/login' className='landing-link'> Login </Link>
                </nav>
            </div>
        </div>
    )
};

export default Landing;

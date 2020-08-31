import React from 'react';
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
                    <a href='#' className='landing-link'> Sign up </a>
                    <a href='#' className='landing-link'> Login </a>
                </nav>
            </div>
        </div>
    )
};

export default Landing;

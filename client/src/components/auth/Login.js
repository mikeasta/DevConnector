import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './auth.css';

const Login = () => {
    return (
        <section className='login' action="#">
            <h1>
                Login User
            </h1>
            <form className="login-form" >
                <label for='login-email'>
                    Email
                </label>
                <input type="text" id="login-email"/>
                <label for='login-password'>
                    Password 
                </label>
                <input type="password" id="login-password"/>
            </form>
            <button>
                Login
            </button>
            <p>
                Haven't registered yet? <Link to="/register"> Register</Link>
            </p>
        </section>
    )
}

export default Login;


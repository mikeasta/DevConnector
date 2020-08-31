import React from 'react';
import './auth.css';

const Login = () => {
    return (
        <section className='login' action="#">
            <h1>
                Login User
            </h1>
            <form className="login-form" pa>
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
                Haven't registered yet? <a href="#"> Register</a>
            </p>
        </section>
    )
}

export default Login;


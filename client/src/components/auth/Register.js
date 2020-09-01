import React from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

const Register = () => {
    return (
        <section className="register"> 
            <h1>
                Register User
            </h1>
            <form className="register-form">
                <label for="register-name">
                    Name
                </label>
                <input type="text" id="register-name" />
                <label for="register-email">
                    Email
                </label>
                <input type="text" id="register-email" />
                <label for="register-password">
                    Password
                </label>
                <input type="password" id="register-password" />
            </form>
            <button>
                Register
            </button>
            <p>
                Already registered? <Link to="/login"> Login</Link>
            </p>
        </section>
    )
};

export default Register;

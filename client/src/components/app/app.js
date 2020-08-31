// Dependencies
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app.css';

// Components
import Navbar from '../layout/navbar/Navbar';
import Landing from '../layout/landing/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';

// App component
const App = () => {
    return (
        <Router>
            <Navbar />
            <Route path="/" exact >
                <Landing />
            </Route>
            <Route path="/login" exact >
                <Login />
            </Route>
            <Route path="/register" exact >
                <Register />
            </Route>
        </Router>
    )
};

export default App;
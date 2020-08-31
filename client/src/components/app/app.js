import React, { Fragment } from 'react'
import './app.css';

import Navbar from '../layout/navbar/Navbar';
import Landing from '../layout/landing/Landing'

const App = () => {
    return (
        <Fragment>
            <Navbar />
            <Landing />
        </Fragment>
    )
}

export default App;
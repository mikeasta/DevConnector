const jwt = require('jsonwebtoken');
const config = require('config');

// This middleware we use to authenicate user and get his data
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token 
    if (!token) { 
        return res.status(401).json( {msg: 'No token. Authorisation denied'} );
    }

    // Verify token
    try {
        // Getting user id from jwt, then edit our request
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(error) {
        return res.status(401).json( { msg:'Token is not valid'})
    }
}
const express = require('express');
const connectDB = require('./config/db');
const portString = require('./beautifulMessages/server');

const app = express();

// Connect to DB
connectDB();

// Init Middleware 
// This middleware gives us oportunity to 
// read req.body data in more comfortable json object
app.use(express.json({ extended: false }));

// Checking if http (and server) works
app.get('/', (req, res) => res.send('API running'));

// Defining our PORT
const PORT = process.env.PORT || 5000;

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

// Listen if our server starts
app.listen( PORT, () => {
    console.log(portString(PORT));
})
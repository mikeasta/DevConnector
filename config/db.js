const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoURI');
const dbString = require('../beautifulMessages/db');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(dbString());
    } catch(error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
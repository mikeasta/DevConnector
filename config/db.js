const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB has been connected');
    } catch(error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;


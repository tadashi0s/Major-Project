const mongoose = require('mongoose');
require('dotenv').config();

function connectDB() {
    // Database connection 🥳
    mongoose.connect(`mongodb://localhost:27017/fileshare`, { useNewUrlParser: true, useUnifiedTopology: true, });
    const connection = mongoose.connection;
    connection.once('open', (e) => {
        if(e) throw e;
        console.log('Database connected 🥳🥳🥳🥳');
    })
}



module.exports= connectDB;
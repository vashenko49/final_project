const mongoose = require('mongoose');
const config = require("../config/index");


const connectDB = async () => {
    try {
        await mongoose.connect(config.mogodbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('Mongo Connected...');
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};


module.exports = connectDB;
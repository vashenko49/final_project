const mongoose = require('mongoose');


const connectDB = async (urlBaseData) => {
    try {
        await mongoose.connect(urlBaseData, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`Mongo Connected... ${urlBaseData}`);
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};


module.exports = connectDB;

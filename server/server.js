const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect data base
connectDB();

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use('/oauth',require('./routes/oauth'));



app.use(express.static('../client/build'));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../','client/build/index.html'))
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server start on ${PORT}`);
});
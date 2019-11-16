const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const getConfig = require('./config/GetConfig');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//connect data base
getConfig('configs-v1')
  .then(() => {
    // connectDB();
    connectDB(process.env.urlDataBase);
    app.use(passport.initialize());
    require("./config/passport")(passport);
  }).catch(err => {
  console.error(err);
});


app.use(bodyParser.json());


// Passport middleware

// Passport Config

// Use Routes
app.use('/oauth', require('./routes/oauth'));
app.use('/configs', require('./routes/configs'));


app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'client/build/index.html'))
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server start on ${PORT}`);
});

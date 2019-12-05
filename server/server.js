const express = require('express');
const connectDB = require('./common/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const getConfig = require('./config/GetConfig');
const cors = require('cors');

const app = express();
app.use(cors());


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

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

// Use Routes
app.use('/customers', require('./routes/customers'));
app.use('/configs', require('./routes/configs'));
app.use('/filters', require('./routes/filters'));
app.use('/catalog', require('./routes/catalog'));
app.use('/products', require('./routes/products'));
app.use('/wishlist', require('./routes/wishlist'));
app.use('/subscriber', require('./routes/subscribers'));
app.use('/comment', require('./routes/comment'));

app.use('/cart', require('./routes/cart'));
app.use('/links', require('./routes/links'));
app.use('/pages', require('./routes/pages'));


app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'client/build/index.html'))
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (!process.env.NODE_ENV) {
    console.log(`Server start on ${PORT}`);
  }
});


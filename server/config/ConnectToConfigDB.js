const mongoose = require('mongoose');
let ConfigDataBAse = require('./ConfigDataBase');

module.exports = mongoose.createConnection(ConfigDataBAse.mongoURI,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

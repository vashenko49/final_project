const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const CustomerSchema = new Schema({
  customerNo: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  login: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: ""
  },
  telephone: {
    type: String
  },
  socialmedia:{
    type: Array,
    default:[]
  },
  birthdate: {
    type: String
  },
  gender: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

CustomerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = Customer = mongoose.model("customer", CustomerSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilterSchema = new Schema(
  {
    name:{
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Filter = mongoose.model("subfilters", FilterSchema,'subfilters');

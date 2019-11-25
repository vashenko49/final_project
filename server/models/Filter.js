const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilterSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    enabled:{
      type: Boolean,
      default: false
    },
  }
);

module.exports = Filter = mongoose.model("filters", FilterSchema,'filters');

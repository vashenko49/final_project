const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilterSchema = new Schema(
  {
    _idFilter: {
      type: Schema.Types.ObjectID,
      ref:"filters",
      required: true
    },
    name:{
      type: String,
      required: true
    },
    enabled:{
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Filter = mongoose.model("subfilters", FilterSchema,'subfilters');

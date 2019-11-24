const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinksSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      default: [{
        description: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  }
);

module.exports = Links = mongoose.model("links", LinksSchema);

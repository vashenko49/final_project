const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinksSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      required: true
    },
    links: [{
      enabled: {
        type: Boolean,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      customId: {
        type: String,
        required: true
      },
      htmlContent: {
        type: String,
        required: true
      }
    }],
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  }
);

module.exports = Links = mongoose.model("links", LinksSchema);

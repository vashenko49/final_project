const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PagesSchema = new Schema(
  {
    customId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    htmlContent: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  }
);

module.exports = Pages = mongoose.model("pages", PagesSchema);

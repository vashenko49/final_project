const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogSchema = new Schema(
  {
    name: {
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

module.exports = Catalog = mongoose.model("rootcatalogs", CatalogSchema);

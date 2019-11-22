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
    }
  }
);

module.exports = Catalog = mongoose.model("rootcatalogs", CatalogSchema);

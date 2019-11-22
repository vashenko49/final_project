const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    parentId: {
      type: String,
      required: true
    },
    filter:[
      {
        type:Schema.Types.ObjectID,
        ref:'filters'
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Catalog = mongoose.model("childcatalogs", CatalogSchema);

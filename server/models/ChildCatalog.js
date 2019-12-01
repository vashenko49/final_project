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
      ref:"rootcatalogs",
      required: true
    },
    enabled:{
      type: Boolean,
      default: false
    },
    filters:[
      {
        filter:{
          type: Schema.Types.ObjectID,
          required:true,
          ref:'filters'
        },
        subfilters:[
          {
            type: Schema.Types.ObjectID,
            ref:'subfilters'
          }
        ]
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Catalog = mongoose.model("childcatalogs", CatalogSchema, 'childcatalogs');

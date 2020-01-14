const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(100000, 999999);
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema(
  {
    itemNo: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    nameProduct: {
      type: String,
      required: true

    },
    warning: [{
      type: String
    }],
    enabled: {
      type: Boolean,
      default: false
    },
    _idChildCategory: {
      type: Schema.Types.ObjectID,
      required: true,
      ref: "childcatalogs"
    },
    description: {
      type: String,
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices nunc sit amet ipsum auctor, eu laoreet ante mattis. Nullam nibh nibh, suscipit in aliquet in, sodales vitae tellus. Nam ut lorem aliquam, ornare nunc non, interdum ex. Aenean sit amet pretium mauris. Nunc eu diam eu odio feugiat eleifend ut non ex. Vestibulum sed magna in nisl ultrices consequat. Curabitur luctus sapien eu nunc efficitur, eu mattis libero sollicitudin. Aliquam accumsan magna a varius consectetur. Aliquam non ligula ex. Maecenas luctus arcu nulla, vitae auctor odio fringilla quis. Nam sollicitudin eu sem ac sodales. Sed ac nibh nunc."
    },
    comments:[
      {
        type:Schema.Types.ObjectID,
        ref:'comments'
      }
    ],
    filters: [
      {
        filter: {
          type: Schema.Types.ObjectID,
          ref: 'filters'
        },
        subFilter: {
          type: Schema.Types.ObjectID,
          ref: 'subfilters'
        }
      }
    ],
    productUrlImg: [
      {
        type: String
      }
    ],
    filterImg:[
      {
        _idFilter:{
          type: Schema.Types.ObjectID,
          ref: 'filters'
        },
        _idSubFilters:{
          type: Schema.Types.ObjectID,
          ref: 'subfilters'
      },
        urlImg:[
          {
          type:String
        }
        ]
      }
    ],
    htmlPage:{
      type:String,
    },
    isBigImg:{
      type:Boolean,
      default:false
    },
    model: [
      {
        warning: [{
          type: String
        }],
        filters: [
          {
            filter: {
              type: Schema.Types.ObjectID,
              ref: 'filters'
            },
            subFilter: {

              type: Schema.Types.ObjectID,
              ref: 'subfilters'
            }
          }
        ],
        quantity: {
          type: Number,
          required: true
        },
        currentPrice: {
          type: Number,
          required: true
        },
        previousPrice: {
          type: Number
        },
        enabled: {
          type: Boolean,
          default: false
        },
        modelNo: {
          type: String,
          required: true
        }
      }
    ]
  }
);

ProductSchema.plugin(mongoosePaginate);

module.exports = Product = mongoose.model("products", ProductSchema, 'products');





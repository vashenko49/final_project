const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require('order-id')(process.env.orderIdSecret);

const ProductSchema = new Schema(
  {
    itemNo: {
      type: String,
      required: true
    },
    nameProduct: {
      type: String,

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
          require: true,
          ref: 'subfilters'
        },
        urlImg:[{
          type:String
        }]
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
          default: uuid.generate()
        }
      }
    ]
  }
);

module.exports = Product = mongoose.model("products", ProductSchema, 'products');





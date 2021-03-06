const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(100000, 999999);
const mongoosePaginate = require('mongoose-paginate-v2');

const OrderSchema = new Schema(
  {
    orderNo: {
      type: String,
      default: (rand()).toString()
    },
    idCustomer: {
      type: Schema.Types.ObjectId,
      ref: "customer"
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        modelNo: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        currentPrice: {
          type: Number,
          required: true
        }
      }
    ],
    delivery: {
      idShippingMethod: {
        type: Schema.Types.ObjectId,
        ref: 'shipping-methods',
        required: true
      },
      storeAddress: {
        type: Schema.Types.ObjectId,
        ref: 'deliveryaddresses'
      },
      address: {
        country: {
          type: String,
          require: true
        },
        city: {
          type: String,
          require: true
        },
        postal: {
          type: String,
          require: true
        },
        street: {
          type: String,
          require: true
        },
        houseNumber:{
          type: String,
          require: true
        }
      }
    },
    totalSum: {
      type: Number,
      required: true
    },
    canceled: {
      type: Boolean,
      default: false
    },
    status: {
      type: String
    },
    name:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);
OrderSchema.plugin(mongoosePaginate);

module.exports = Order = mongoose.model("orders", OrderSchema, "orders");

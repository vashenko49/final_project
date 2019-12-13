const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(100000, 999999);

const OrderSchema = new Schema(
  {
    orderNo: {
      type: String,
      default: (rand()).toString()
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers"
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

module.exports = Order = mongoose.model("orders", OrderSchema, "orders");

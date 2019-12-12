import product from "../../client/src/reducers/product";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require('order-id')(process.env.orderIdSecret);

const OrderSchema = new Schema(
  {
    orderNo: {
      type: String,
      default: uuid.generate()
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers"
    },
    products: [
      {
        productId:{
          type: Schema.Types.ObjectId,
          ref:'products',
          required: true
        },
        modelNo:{
          type: String,
          required: true
        },
        currentPrice:{
          type: Number,
          required: true
        }
      }
    ],
    delivery: {
      idShippingMethod:{
        type: Schema.Types.ObjectId,
        ref: 'shipping-methods',
        required: true
      },
      isExpressDelivery:{
        type: Boolean,
        required: true
      },
      address:{
        type:Schema.Types.ObjectId,
        ref:'deliveryaddresses'
      },
      expressDeliveryAddress:{
        country:{
          type:String,
          require: true
        },
        city:{
          type:String,
          require:true
        },
        postal:{
          type:String,
          require: true
        },
        address:{
          type:String,
          require: true
        }
      }
    },
    shipping: {
      type: Schema.Types.Mixed
    },
    paymentInfo: {
      type: Schema.Types.ObjectId,
      ref: 'payment-methods'
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
  },
  { strict: false }
);

module.exports = Order = mongoose.model("orders", OrderSchema, "orders");

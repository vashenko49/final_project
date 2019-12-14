const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShippingMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    isDeliveryAddress:{
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    default: {
      type: Boolean,
      required: true,
      default: false
    },
    enabled: {
      type: Boolean,
      required: true,
      default: false
    },
    imageUrl: {
      type: String
    },
    period: {
      type: String
    },
    freeShippingOrderSum: {
      type: Number
    },
    address:[
      {
        type: Schema.Types.ObjectId,
        ref:'deliveryaddresses'
      }
    ],
    currency: {
      type: String
    },
    costValue: {
      type: Number,
      required: true,
      default: 0
    },
  }
);

module.exports = ShippingMethod = mongoose.model("shipping-methods", ShippingMethodSchema,'shipping-methods');

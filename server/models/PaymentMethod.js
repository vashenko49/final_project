const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    enabled: {
      type: Boolean,
      required: true,
      default: false
    },
    default: {
      type: Boolean,
      required: true,
      default: false
    },
    isPayOnline:{
      type:Boolean,
      default:false
    },
    imageUrl: {
      type: String
    },
    paymentProcessor: {
      type: Schema.Types.Mixed
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = PaymentMethod = mongoose.model(
  "payment-methods",
  PaymentMethodSchema,
  "payment-methods"
);

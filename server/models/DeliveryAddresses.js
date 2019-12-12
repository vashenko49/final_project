const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryAddressesSchema = new Schema(
  {
    address:{
      type:String,
      required: true
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
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = DeliveryAddresses = mongoose.model("deliveryaddresses", DeliveryAddressesSchema, 'deliveryaddresses');

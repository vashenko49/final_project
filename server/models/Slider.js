const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SliderSchema = new Schema(
  {
    enabled:{
      type: Boolean,
      default: false
    },
    title: String,
    imageUrl: {
      type: String,
      required: true
    },
    description: String,
    htmlContent: String,
    product: {
      type: Schema.Types.ObjectId,
      ref: "products"
    },
    childCatalogs: {
      type: Schema.Types.ObjectId,
      ref: "childcatalogs"
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Slider = mongoose.model("slides", SliderSchema, "slides");

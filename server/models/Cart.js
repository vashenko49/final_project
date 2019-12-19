const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  products: [
    {
      idProduct: {
        type: Schema.Types.ObjectId,
        ref: "products",
        require: true
      },
      modelNo: {
        type: String,
        require: true
      },
      quantity: {
        type: Number,
        require: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema, "cart");

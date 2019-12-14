const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
<<<<<<< HEAD
    {
        customerId: {
            type: Schema.Types.ObjectID,
            ref: "customers",
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectID,
                    ref: "products"
                },
                cartQuantity: {
                    type: Number
                }
            }
        ],
        date: {
            type: Date,
            default: Date.now
=======
  {
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
          type:String,
          require: true
        },
        quantity: {
          type: Number,
          require: true
>>>>>>> develop
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Cart = mongoose.model("cart", CartSchema, "cart");

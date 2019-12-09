const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
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
        }
    },
    { strict: false }
);

module.exports = Cart = mongoose.model("cart", CartSchema, "cart");

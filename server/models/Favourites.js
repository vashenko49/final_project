const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilterSchema = new Schema(
  {
    idProduct: [{
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true
    }],
    idCustomer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Favourites = mongoose.model("favourites", FilterSchema, 'favourites');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema(
  {
    email: {
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

module.exports = Subscriber = mongoose.model("subscribers", SubscriberSchema);

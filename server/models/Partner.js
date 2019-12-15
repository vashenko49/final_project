const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
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
    imageUrl: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Partner = mongoose.model("partners", PartnerSchema, "partners");

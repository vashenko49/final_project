const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  authorId:{
    type: Schema.Types.ObjectID,
    require:true,
    ref:"customer"
  },
  productID:{
    type: Schema.Types.ObjectID,
    require: true,
    ref: 'products'
  },
  score:{
    type:Number,
    require: true,
    min: 0,
    max: 5
  },
  text:{
    type:String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now()
  }
});



module.exports = Catalog = mongoose.model("comments", CommentSchema, 'comments');

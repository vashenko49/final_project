const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const CommentSchema = require('../models/Comment');
const CustomerSchema = require('../models/Customer');
const ProductSchema = require('../models/Product');
const _ = require('lodash');

exports.createNewComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {authorId, productID, score, text} = req.body;

    if(score>5 || score<0){
      res.status(400).json({
        message:'Score must be greater than zero and less than 5'
      })
    }
    const product = await ProductSchema.findById(productID);

    if(_.isEmpty(product)){
      res.status(400).json({
        message:`Not found a product with ID ${productID}`
      })
    }

    const customer = await CustomerSchema.findById(authorId);
    if(_.isEmpty(customer)){
      res.status(400).json({
        message:`Not found a user with ID ${authorId}`
      })
    }

    const newComment = await CommentSchema({
      authorId:authorId,
      productID:productID,
      score: score,
      text: text
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (e) {
    res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.editComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const {commentID, score, text } = req.body;

    let comment = await CommentSchema.findById(commentID);


    if(_.isEmpty(comment)){
      res.status(400).json({
        message:`Not found a comment with ID ${commentID}`
      })
    }

    comment.score = !_.isNumber(score)&&((score>5 || score<0))?comment.score:score;
    comment.text = _.isString(text)?text:comment.text;

    comment = await comment.save();

    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.removeComment = async (req, res) => {
  try {
    const {idComment} = req.params;

    if(!mongoose.Types.ObjectId.isValid(idComment)){
      return res.status(400).json({
        message:`ID is not valid ${idComment}`
      })
    }
    let comment = await CommentSchema.findById(idComment);

    if(_.isEmpty(comment)){
      return res.status(400).json({
        message:`Not found a comment with ID ${idComment}`
      })
    }

    await comment.delete();

    res.status(200).json({msg: 'SubFilter deleted'})
  } catch (e) {
    return res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await CommentSchema.find({});
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const {commentID} = req.params;

    if(!mongoose.Types.ObjectId.isValid(commentID)){
      return res.status(400).json({
        message:`ID is not valid ${commentID}`
      })
    }

    const comment = await CommentSchema.findById(commentID);
    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getCommentsByUserId = async (req, res) => {
  try {
    const {userID} = req.params;

    if(!mongoose.Types.ObjectId.isValid(userID)){
      return res.status(400).json({
        message:`ID is not valid ${userID}`
      })
    }

    const comments = await CommentSchema.find({authorId: userID});
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

exports.getCommentsByProductId = async (req, res) => {
  try {
    const {productID}= req.params;

    if(!mongoose.Types.ObjectId.isValid(productID)){
      return res.status(400).json({
        message:`ID is not valid ${productID}`
      })
    }

    const comments = await CommentSchema.find({productID: productID});
    res.status(200).json(comments);

  } catch (e) {
    res.status(500).json({
      message: `Server error ${e.message}`
    })
  }
};

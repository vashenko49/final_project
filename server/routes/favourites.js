const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addToFavourites,
  getFavourites,
  productIsFavourites,
  removeFromFavourites,
} = require("../controllers/favourites");

// @route   POST /favourites/:idProduct
// @desc    Add product to favourites list
// @access  Private
router.post(
  "/:idProduct",
  passport.authenticate("jwt", {session: false}),
  addToFavourites
);

// @route   GET /favourites
// @desc    Get favourites list  by user
// @access  Public
router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  getFavourites
);

// @route   GET /favourites/:idProduct
// @desc    Get favourites list  by user
// @access  Public
router.get(
  "/:idProduct",
  passport.authenticate("jwt", {session: false}),
  productIsFavourites
);

// @route   DELETE /favourites/:idProduct
// @desc    Delete links group
// @access  Private
router.delete("/:idProduct",
  passport.authenticate("jwt", {session: false}),
  removeFromFavourites);


module.exports = router;

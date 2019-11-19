const express = require("express");
const router = express.Router();
const passport = require("passport");


//Import controllers
const {
  addConfig,
  updateConfig,
  deleteConfig,
  getConfigs,
  getConfigById,
  useSpecifiedConfiguration
} = require("../controllers/Configs");

// @route   POST /configs
// @desc    Create new config
// @access  Private
router.post(
  "/",
  addConfig
);

// @route   PUT /configs/:customId
// @desc    Update existing config
// @access  Private
router.put(
  "/:customId",
  updateConfig
);

// @route   DELETE /configs/:customId
// @desc    DELETE existing config
// @access  Private
router.delete(
  "/:customId",
  deleteConfig
);

// @route   GET /configs
// @desc    GET existing configs
// @access  Public
router.get(
  "/",
  getConfigs
);

// @route   GET /configs/:customId
// @desc    GET existing configs
// @access  Public
router.get(
  "/:customId",
  getConfigById
);


// @route   GET /configs/use/:customId
// @desc    use specified configuration
// @access  Public
router.get(
  "/use/:customId",
  useSpecifiedConfiguration
);




module.exports = router;

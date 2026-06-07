const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const {
  register,
  login,
} = require("../controllers/authController");

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

module.exports = { authRoutes: router};
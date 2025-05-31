const express = require('express');
const userController = require("../controllers/user.js");
const {rateLimiter} = require("../middleware/rateLimiter.js");

const router = express.Router();

router.post("/register", rateLimiter, userController.registerUser);
router.post("/login", rateLimiter, userController.loginUser);

module.exports = router;
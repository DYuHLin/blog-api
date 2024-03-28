const express = require('express');
const jwt = require("jsonwebtoken");
const registerController = require('../controller/LoginAndRegisterController');

const router = express.Router();

// router.get("/", (req, res, next) => {
//     return res.send("Register Page");
// });

router.post("/", registerController.post_register);

module.exports = router;
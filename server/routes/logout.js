const express = require('express');
const jwt = require("jsonwebtoken");
const registerController = require('../controller/LoginAndRegisterController');

const router = express.Router();

// router.get("/", (req, res, next) => {
//     return res.send("Register Page");
// });

router.post("/", registerController.verifyToken, registerController.post_logout);
router.post("/delete", registerController.verifyToken, registerController.post_delete);

module.exports = router;
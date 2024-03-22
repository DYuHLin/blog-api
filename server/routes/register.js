const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res, next) => {
    return res.send("Register Page");
});

router.post("/", (req, res, next) => {
    const user = {
        id: 1,
        name: "damian",
        surname: "Lin",
        username: "damian",
        password: "qwerty123456"
    };

    jwt.sign();
});
const asyncHandler = require('express-async-handler');
const {body, ValidationResult} = require('express-validator');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.post_register = asyncHandler(async (req, res, next) => {
    try{
        bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
            if(err){
                return next(err);
            } else if(req.body.password !== req.body.confirmedPassword){
                console.log("Password don't match");  
            } else {
                const user = new users({
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                });

                const newUser = user.save();
                res.redirect("/login");
            };
        });
    }catch(err){
        next(err);
    };
});

exports.post_login = asyncHandler(async (req, res, next) => {
    try{
        const userName = users.findOne({username: req.body.username});
        if(!userName){
            console.log("Incorrect username");
        };
        
        const userIn = {
            id: 1,
            username: "dame",
            email: "dame@gmail.com",
        }


        return jwt.sign({user: userIn}, 'secretkey', (err, token) =>  {
            res.json({
                token: token
            });
        });
    }catch(err){
        console.log(err);
    };
});

function verifyToken(req, res, next){
    //get auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if(typeof bearerHeader !== "undefined"){
        //split the space in token
        const bearer = bearerHeader.split(" ");
        //get token from array
        const bearerToken = bearer[1];
        //set tokem
        req.token = bearerToken;
        //next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    };
};
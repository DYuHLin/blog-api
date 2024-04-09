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

                await user.save();
            };
        });
    }catch(err){
        next(err);
    };
});

let refreshTokens = [];

const getAccessToken = (user) => {
    return jwt.sign({user}, 'secretkey');
};

const getRefreshToken = (user) => {
    return jwt.sign({user}, 'refreshsecretkey');
};

exports.post_login = asyncHandler(async (req, res, next) => {
    try{
        const userName = await users.findOne({username: req.body.username});
        if(!userName){
            console.log("Incorrect username");
        };

        const match = await bcrypt.compare(req.body.password, userName.password);
        if(!match){
            return console.log("Incorrect Password");
        };

        // jwt.sign({user: userName}, 'secretkey', (err, token) =>  {
        //     res.json({
        //         token: token
        //     });
        // });

        // jwt.sign({user: userName}, 'refreshsecretkey', (err, token) =>  {
        //     res.json({
        //         token: token
        //     });
        // });
        const accessToken = getAccessToken(userName);
        const refreshToken = getRefreshToken(userName);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    }catch(err){
        console.log(err);
    };
});

exports.refresh_token = asyncHandler(async (req, res, next) => {
    //token from user
    const refreshToken = req.body.token;
    //send error if there is no token or invalid
    if(!refreshToken) return res.status(403).json("You are not authenticated");
    if(refreshTokens.includes(refreshToken)){
        return res.status(403).json("refresh token is not valid");
    };
    jwt.verify(refreshToken, "refreshsecretkey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = getAccessToken(user);
        const newRefreshToken = getRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    });
    //if everything is ok create a new access token, refresh token and send to user
});

exports.verifyToken = (req, res, next) =>{
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

    exports.post_logout = asyncHandler(async (req, res, next) => {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        res.status(200).json("You have logged out.");
    });
};

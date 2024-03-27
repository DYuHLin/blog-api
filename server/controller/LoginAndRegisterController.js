const asyncHandler = require('express-async-handler');
const {body, ValidationResult} = require('express-validator');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const user = await users.findOne({username: username});
            if(!user){
                return done(null, false, {message: "Incorrect username"});
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);
        }catch(err){
            return done(err);
        };
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await users.findById(id);
        done(null, user);
    }catch(err){
        done(err);
    };
});


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
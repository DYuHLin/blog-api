const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require('mongoose');

const app = express();

// passport.use(jwtStrategry);

mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://dyhlin2000:damian1216@cluster0.m0q0vry.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";

 app.use(cors());
 app.use(express.json());
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())

async function main(){
    mongoose.connect(mongoDB);
};

main().catch((err) => {console.log(err)});

// app.post("/posts/login", (req, res, next) => {
//     let {email, password} = req.body;
// });

 //format of token
 //authorization bearer <access_token>


 const verifyToken = ((req, res, next) => {
    //get auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefinef
    if(typeof bearerHeader !== "undefined"){

    } else {
        //forbidden
        res.sendSatus(403);
    };
});

 app.get("/posts", (req, res, next) => {
     res.json({
        message: "GET Method for posts"
    });
 });

 app.post("/posts/post", verifyToken, (req, res, next) => {
    res.json({
        message: "GET Method for post"
    });
 });

 app.post("/posts/login", (req, res, next) => {
    //
    const user = {
        id: 1,
        username: "dame",
        email: "dame@gmail.com",
    }


    return jwt.sign({user: user}, 'secretkey', (err, token) =>  {
        res.json({
            token: token
        });
    });
 });

// app.get("/posts/:id", (req, res, next) => {
//     return res.send("GET Method for specific post");
// });

// app.get("/posts/create", (req, res, next) => {
//     return res.send("GET Method for create post");
// });

// app.get("/posts/:id/update", (req, res, next) => {
//     return res.send("GET Method for update post");
// });

// app.get("/posts/:id/delete", (req, res, next) => {
//     return res.send("GET Method for delete post");
// });

// app.get("/posts/login", (req, res, next) => {
//     return res.send("GET Method for login");
// });

app.listen(5000, () => console.log("Listening on port 5000"));
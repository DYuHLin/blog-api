const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require('mongoose');
const register = require("./routes/register");
const refresh = require("./routes/refresh");
const login = require("./routes/login");
// const logout = require("./routes/logout");
const post = require("./routes/post");
const comment = require("./routes/comments");

const app = express();

// passport.use(jwtStrategry);

mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://dyhlin2000:damian1216@cluster0.m0q0vry.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function main(){
    mongoose.connect(mongoDB);
};

main().catch((err) => {console.log(err)});

// app.post("/posts/login", (req, res, next) => {
//     let {email, password} = req.body;
// });

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/api/register", register);
app.use("/api/login", login);
// app.use("/posts/logout", logout);
app.use("/api/refresh", refresh);
app.use("/api", post);
app.use("/api", comment);

 app.get("/posts", (req, res, next) => {
     res.json({
        message: "GET Method for posts"
    });
 });

 app.post("/posts/post", verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: "GET Method for post",
                authData
            });
        };
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

  //format of token
 //authorization bearer <access_token>
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
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
const logout = require("./routes/logout");
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

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/refresh", refresh);
app.use("/api", post);
app.use("/api", comment);


app.listen(5000, () => console.log("Listening on port 5000"));
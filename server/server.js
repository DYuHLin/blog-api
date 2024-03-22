const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

app.get("/posts", (req, res, next) => {
    return res.send("GET Method for posts");
});

app.get("/posts/:id", (req, res, next) => {
    return res.send("GET Method for specific post");
});

app.get("/posts/create", (req, res, next) => {
    return res.send("GET Method for create post");
});

app.get("/posts/:id/update", (req, res, next) => {
    return res.send("GET Method for update post");
});

app.get("/posts/:id/delete", (req, res, next) => {
    return res.send("GET Method for delete post");
});

app.get("/posts/login", (req, res, next) => {
    return res.send("GET Method for login");
});

app.listen(5000, () => console.log("Listening on port 5000"));
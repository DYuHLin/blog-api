const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const posts = require('../models/posts');

exports.post_post = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const post = new posts({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        date: Date.now(),
        published: req.body.published,
        });

    if(!errors.isEmpty()){
        return console.log(errors);
    } else {
        await post.save();
    };

    const newPost = post.save();
});
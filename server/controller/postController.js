const asyncHandler = require('express-async-handler');
const {body, ValidationResult} = require('express-validator');
const posts = require('../models/posts');

exports.post_post = [
    asyncHandler(async (req, res, next) => {
        const postInstance = new posts({
            
        });
    })
];
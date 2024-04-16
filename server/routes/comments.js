const express = require('express');
const commentController = require('../controller/commentsController');

const router = express.Router();

router.get("/comments", commentController.get_comments);
router.post("/create", commentController.post_comment);
router.delete("/delete", commentController.post_delete_comment);

module.exports = router;
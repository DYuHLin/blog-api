const express = require('express');
const commentController = require('../controller/commentsController');

const router = express.Router();

router.get("/:id/comments", commentController.get_comments);
router.post("/:id/create", commentController.post_comment);
router.delete("/:id/delete", commentController.post_delete_comment);

module.exports = router;
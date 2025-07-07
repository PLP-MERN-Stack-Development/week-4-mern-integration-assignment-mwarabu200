const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET comments for a post
router.get('/:id/comments', commentController.getCommentsForPost);

// POST a new comment
router.post('/:id/comments', commentController.createComment);

module.exports = router;

const express = require('express');
const router = express.Router();
const commentsLike = require('../controllers/comment.likes.controller');

// Create a new Like
router.post('/', commentsLike.create);

// Retrieve all Likes by commentId from the database
router.get('/:commentId', commentsLike.findAllByComment);

// Delete a Like with likeId
router.delete('/:likeId/:commentId', commentsLike.delete);

module.exports = router;

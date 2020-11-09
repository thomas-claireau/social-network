const express = require('express');
const router = express.Router();
const commentsDislikes = require('../controllers/comment.dislikes.controller');

// Create a new Dislike
router.post('/', commentsDislikes.create);

// Retrieve all Dislikes by commentId from the database
router.get('/:commentId', commentsDislikes.findAllByComment);

// Delete a Dislike with likeId
router.delete('/:dislikeId/:commentId', commentsDislikes.delete);

module.exports = router;

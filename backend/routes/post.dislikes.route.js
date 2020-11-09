const express = require('express');
const router = express.Router();
const postsDislikes = require('../controllers/post.dislikes.controller');

// Create a new Dislike
router.post('/', postsDislikes.create);

// Retrieve all Dislikes by postId from the database
router.get('/post/:postId', postsDislikes.findAllByPost);

// Delete a Dislike with likeId
router.delete('/:dislikeId/:postId', postsDislikes.delete);

module.exports = router;

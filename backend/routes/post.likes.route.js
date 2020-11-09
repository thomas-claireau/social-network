const express = require('express');
const router = express.Router();
const postsLikes = require('../controllers/post.likes.controller');

// Create a new Like
router.post('/', postsLikes.create);

// Retrieve all Likes by postId from the database
router.get('/:postId', postsLikes.findAllByPost);

// Delete a Like with likeId
router.delete('/:likeId/:postId', postsLikes.delete);

module.exports = router;

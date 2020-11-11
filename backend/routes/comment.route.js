const express = require('express');
const router = express.Router();
const comments = require('../controllers/comment.controller');

// Create a new Comment
router.post('/', comments.create);

// Retrieve all Comments
router.get('/', comments.findAll);

// Retrieve all Comments by postId from the database
router.get('/post/:postId', comments.findAllByPost);

// Retrieve a single Comment with commentId
router.get('/:commentId', comments.findOne);

// Update a Comment with commentId
router.put('/:commentId', comments.update);

// Delete a Comment with commentId
router.delete('/:commentId', comments.delete);

module.exports = router;

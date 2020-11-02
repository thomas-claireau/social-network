const express = require('express');
const router = express.Router();
const comments = require('../controllers/comment');

// Create a new Comment
router.post('/comments', comments.create);

// Retrieve all Comments
router.get('/comments', comments.findAll);

// Retrieve a single Comment with commentId
router.get('/comments/:commentId', comments.findOne);

// Update a Comment with commentId
router.put('/comments/:commentId', comments.update);

// Delete a Comment with commentId
router.delete('/comments/:commentId', comments.delete);

module.exports = router;

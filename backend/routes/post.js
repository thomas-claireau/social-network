const express = require('express');
const router = express.Router();
const posts = require('../controllers/post');

// Create a new User
router.post('/posts', posts.create);

// Retrieve all Users
router.get('/posts', posts.findAll);

// Retrieve a single User with postId
router.get('/posts/:postId', posts.findOne);

// Update a User with userId
router.put('/posts/:postId', posts.update);

// Delete a User with userId
router.delete('/posts/:postId', posts.delete);

module.exports = router;

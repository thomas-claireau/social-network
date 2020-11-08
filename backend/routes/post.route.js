const express = require('express');
const router = express.Router();
const posts = require('../controllers/post.controller');

// Create a new User
router.post('/', posts.create);

// Retrieve all Users
router.get('/', posts.findAll);

// Retrieve all Posts by userId from the database
router.get('/user/:userId', posts.findAllByUser);

// Retrieve a single User with postId
router.get('/:postId', posts.findOne);

// Update a User with userId
router.put('/:postId', posts.update);

// Delete a User with userId
router.delete('/:postId', posts.delete);

module.exports = router;

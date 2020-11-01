module.exports = (app) => {
	const posts = require('../controllers/post.controller.js');

	// Create a new User
	app.post('/posts', posts.create);

	// Retrieve all Users
	app.get('/posts', posts.findAll);

	// Retrieve a single User with postId
	app.get('/posts/:postId', posts.findOne);

	// Update a User with userId
	app.put('/posts/:postId', posts.update);

	// Delete a User with userId
	app.delete('/posts/:postId', posts.delete);
};

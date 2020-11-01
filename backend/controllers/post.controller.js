const Post = require('../models/post.model');

// Create and Save a new Post
exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty !',
		});

		return;
	}

	// create a post
	const post = new Post({ ...req.body });

	// save post in DB
	Post.create(post, (err, data) => {
		if (err) {
			res.status(err.code).send({
				message: err.message || 'Some error occurred while creating the Post',
			});
		} else {
			res.status(201).send(data);
		}
	});
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
	Post.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurrend while retrieving posts',
			});
		} else {
			res.send(data);
		}
	});
};

// Find a single Post with a postId
exports.findOne = (req, res) => {
	Post.findById(req.params.postId, (err, data) => {
		let message = null;

		if (err) {
			if (err.code === 404) {
				message = `Not found Post with id ${req.params.postId}`;
			} else {
				message = `Error retrieving Post with id ${req.params.postId}`;
			}

			res.status(err.code).send({ message });
		} else {
			res.send(data);
		}
	});
};

// Update a Post identified by the postId in the request
exports.update = (req, res) => {
	Post.updateById(req.params.postId, req.body, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Post with id ${res.params.postId}`,
				});
			} else {
				res.status(500).send({
					message: `Error retrieving Post with id ${req.params.postId}`,
				});
			}
		} else {
			res.send(data);
		}
	});
};

// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
	Post.remove(req.params.postId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Post with id ${res.params.postId}`,
				});
			} else {
				res.status(500).send({
					message: `Error retrieving Post with id ${req.params.postId}`,
				});
			}
		} else {
			res.send({ message: `Post ${req.params.postId} deleted` });
		}
	});
};

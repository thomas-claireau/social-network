const User = require('../models/user.model');

// Create and Save a new User
exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty !',
		});

		return;
	}

	// create a user
	const user = new User({ ...req.body });

	// save user in DB
	User.create(user, (err, data) => {
		if (err) {
			res.status(err.code).send({
				message: err.message || 'Some error occurred while creating the User',
			});
		} else {
			res.status(201).send(data);
		}
	});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	User.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurrend while retrieving users',
			});
		} else {
			res.send(data);
		}
	});
};

// Find a single User with a userId
exports.findOne = (req, res) => {
	User.findById(req.params.userId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found User with id ${res.params.userId}`,
				});
			} else {
				res.status(500).send({
					message: `Error retrieving User with id ${req.params.userId}`,
				});
			}
		} else {
			res.send(data);
		}
	});
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
	User.updateById(req.params.userId, req.body, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found User with id ${res.params.userId}`,
				});
			} else {
				res.status(500).send({
					message: `Error retrieving User with id ${req.params.userId}`,
				});
			}
		} else {
			res.send(data);
		}
	});
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
	User.remove(req.params.userId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found User with id ${res.params.userId}`,
				});
			} else {
				res.status(500).send({
					message: `Error retrieving User with id ${req.params.userId}`,
				});
			}
		} else {
			res.send({ message: `User ${req.params.userId} deleted` });
		}
	});
};

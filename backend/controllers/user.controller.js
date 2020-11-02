const models = require('../models');

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
	models.User.findAll({ attributes: ['email', 'firstname', 'lastname', 'isAdmin', 'biography'] })
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ error }));
};

// Get one user
exports.findOne = (req, res) => {
	models.User.findOne({
		attributes: ['id', 'email', 'firstname', 'lastname', 'isAdmin', 'biography'],
		where: { id: req.params.userId },
	})
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(500).json(error));
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
exports.delete = (req, res, next) => {
	const userId = jwt.getUserId(req.headers.authorization);

	models.User.findOne({
		where: { id: userId },
	})
		.then((user) => {
			if (!user) {
				res.status(401).json({ error: 'Veuillez vous connecter !' });
			}

			models.User.destroy({
				where: { id: user.id },
			})
				.then(() => res.end())
				.catch((err) => console.log(err));
		})
		.catch((err) => res.status(500).json(err));
};

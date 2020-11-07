const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

// Create and Save a new User
exports.create = (req, res) => {
	const userBody = req.body;

	models.User.findOne({
		attributes: ['email'],
		where: { email: userBody.email },
	}).then((user) => {
		if (user) {
			res.status(409).json({
				error: "L'email utilisé correspond déja a un compte existant",
			});
		} else {
			bcrypt.hash(userBody.password, 10, function(err, bcryptPassword) {
				models.User.create({ ...userBody, password: bcryptPassword })
					.then((user) => {
						res.status(201).json({
							userId: user.dataValues.id,
							token: jwt.generateToken(user.dataValues),
							isAdmin: user.dataValues.isAdmin,
						});
					})
					.catch((err) => {
						res.status(501).json({ err });
					});
			});
		}
	});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	models.User.findAll({
		attributes: ['email', 'firstname', 'lastname', 'username', 'isAdmin', 'biography'],
	})
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json({ error }));
};

// Get one user
exports.findOne = (req, res) => {
	models.User.findOne({
		attributes: ['id', 'email', 'firstname', 'lastname', 'username', 'isAdmin', 'biography'],
		where: { id: req.params.userId },
	})
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(500).json(error));
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
	const userBody = req.body;
	const userId = req.headers.authorization ? jwt.getUserId(req.headers.authorization) : false;
};

// Delete a User with the specified userId in the request
exports.delete = (req, res, next) => {
	const id = req.params.userId;
	const jwtUserId = jwt.getUserId(req.headers.authorization);

	models.User.findOne({
		attributes: ['id'],
		where: { id: id },
	})
		.then((user) => {
			// si pas de user -> return 404
			if (!user) return res.status(404).json({ error: 'Pas de user à supprimer' });

			if (user.dataValues.id != jwtUserId)
				return res
					.status(401)
					.json({ error: "Vous n'êtes pas autorisé à supprimer ce user" });

			models.User.destroy({
				where: { id: id },
			})
				.then(() => res.end())
				.catch((err) => console.log(err));
		})
		.catch((err) => res.status(500).json(err));
};

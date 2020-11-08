const models = require('../models');
const jwt = require('../utils/jwt');

// Create and Save a new Post
exports.create = (req, res) => {
	const postBody = req.body;
	const jwtUserId = jwt.getUserId(req.headers.authorization);

	models.Post.findOne({
		attributes: ['slug', 'userId'],
		where: { slug: postBody.slug },
	})
		.then((post) => {
			if (post)
				return res
					.status(409)
					.json({ error: 'Ce slug est déja utilisé sur un autre article' });

			const date = new Date();

			models.Post.create({
				...postBody,
				UserId: jwtUserId,
				createdAt: date,
				updatedAt: date,
			})
				.then((post) => {
					res.status(201).json({
						userId: post.dataValues.UserId,
						title: post.dataValues.title,
						slug: post.dataValues.slug,
						content: post.dataValues.content,
						createdAt: post.dataValues.createdAt,
					});
				})
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
	models.Post.findAll({
		include: [
			{
				model: models.User,
				attributes: ['username'],
			},
		],
		order: [['updatedAt', 'DESC']],
	})
		.then((posts) => {
			if (posts.length > 0) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ error: 'Pas de post à afficher' });
			}
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Posts by userId from the database
exports.findAllByUser = (req, res) => {
	models.Post.findAll({
		include: [
			{
				model: models.User,
				attributes: ['username'],
			},
		],
		where: { userId: req.params.userId },
		order: [['updatedAt', 'DESC']],
	})
		.then((posts) => {
			if (posts.length > 0) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ error: "Pas d'article à afficher" });
			}
		})
		.catch((err) => res.status(501).json(err));
};

// Find a single Post with a postId
exports.findOne = (req, res) => {
	models.Post.findOne({
		attributes: ['id', 'userId', 'title', 'slug', 'content', 'createdAt', 'updatedAt'],
		where: { id: req.params.postId },
	})
		.then((post) => {
			if (post) {
				return res.status(200).json(post);
			} else {
				res.status(404).json({ error: 'Pas de post à afficher' });
			}
		})
		.catch((error) => res.status(500).json(error));
};

// Update a Post identified by the postId in the request
exports.update = (req, res) => {
	const postBody = req.body;
	const id = req.params.postId;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 1; // TODO

	models.Post.findOne({
		attributes: ['id', 'slug', 'userId'],
		where: { id: id },
	})
		.then((post) => {
			// si pas de post -> return 404
			if (!post) return res.status(404).json({ error: 'Pas de post à modifier' });

			// non autorisé par jwt
			if (post.dataValues.userId != jwtUserId)
				return res
					.status(401)
					.json({ error: "Vous n'êtes pas autorisé à modifier ce post" });

			models.Post.findOne({
				attributes: ['id', 'slug'],
				where: { slug: postBody.slug },
			})
				.then((item) => {
					// si slug a modifié = a un autre -> return 409 conflit
					if (item && item.dataValues.id != id)
						return res
							.status(409)
							.json({ error: 'Ce slug est déja utilisé sur un autre article' });

					models.Post.update(
						{
							...postBody,
							updatedAt: new Date(),
						},
						{ where: { id: id } }
					)
						.then((post) => res.status(200).json({ message: 'Post modifié' }))
						.catch((err) => res.status(501).json(err));
				})
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.postId;
	const jwtUserId = jwt.getUserId(req.headers.authorization);

	models.Post.findOne({
		attributes: ['id', 'userId'],
		where: { id: id },
	})
		.then((post) => {
			// si pas de post -> return 404
			if (!post) return res.status(404).json({ error: 'Pas de post à supprimer' });

			// non autorisé par jwt
			if (post.dataValues.userId != jwtUserId)
				return res
					.status(401)
					.json({ error: "Vous n'êtes pas autorisé à supprimer ce post" });

			models.Post.destroy({
				where: { id: id },
			})
				.then(() => res.status(204).end())
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

const models = require('../models');
const jwt = require('../utils/jwt');

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
	models.Comment.findAll({
		attributes: ['content', 'createdAt', 'updatedAt'],
		include: [
			{
				model: models.User,
				attributes: ['username'],
			},
			{
				model: models.Post,
				attributes: ['title'],
			},
		],
		order: [['createdAt', 'DESC']],
	})
		.then((comments) => {
			if (comments.length > 0) {
				res.status(200).json(comments);
			} else {
				res.status(404).json({ error: 'Pas de commentaire à afficher' });
			}
		})
		.catch((err) => res.status(500).json(err));
};

// Retrieve all Comments by postId from the database
exports.findAllByPost = (req, res) => {
	models.Comment.findAll({
		attributes: ['content', 'createdAt', 'updatedAt'],
		include: [
			{
				model: models.User,
				attributes: ['username'],
			},
			{
				model: models.Post,
				attributes: ['title'],
			},
		],
		where: { postId: req.params.postId },
		order: [['createdAt', 'DESC']],
	})
		.then((comments) => {
			if (comments.length > 0) {
				res.status(200).json(comments);
			} else {
				res.status(404).json({ error: 'Pas de commentaire à afficher' });
			}
		})
		.catch((err) => res.status(500).json(err));
};

// Find a single Comment with a commentId
exports.findOne = (req, res) => {
	models.Comment.findOne({
		attributes: ['id', 'content', 'createdAt', 'updatedAt'],
		include: [
			{
				model: models.User,
				attributes: ['username'],
			},
			{
				model: models.Post,
				attributes: ['title'],
			},
		],
		where: { id: req.params.commentId },
	})
		.then((comment) => {
			if (comment) {
				return res.status(200).json(comment);
			} else {
				res.status(404).json({ error: 'Pas de commentaire à afficher' });
			}
		})
		.catch((error) => res.status(500).json(error));
};

// Create and Save a new Comment
exports.create = (req, res) => {
	const commentBody = req.body;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 1; // TODO
	const date = new Date();

	// check user
	models.User.findOne({
		where: { id: jwtUserId },
		attributes: ['id'],
	}).then((user) => {
		if (!user)
			return res
				.status(401)
				.json({ error: 'Merci de vous connecter pour ajouter ce commentaire' });

		// check post
		models.Post.findOne({
			where: { id: commentBody.PostId },
		}).then((post) => {
			if (!post)
				return res.status(401).json({ error: "Aucun article n'est lié à ce commentaire" });

			// if ok : create comment
			models.Comment.create({
				...commentBody,
				UserId: user.id,
				createdAt: date,
				updatedAt: date,
			})
				.then((comment) => {
					res.status(201).json({
						user: user.dataValues.username,
						post: post.dataValues.title,
						content: comment.dataValues.content,
					});
				})
				.catch((err) => {
					res.status(501).json({ err });
				});
		});
	});
};

// Update a Comment identified by the commentId in the request
exports.update = (req, res) => {
	const commentBody = req.body;
	const id = req.params.commentId;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 1; // TODO

	// check comment
	models.Comment.findOne({
		attributes: ['id', 'postId', 'userId'],
		where: { id: id },
	}).then((comment) => {
		if (!comment) return res.status(404).json({ err: "Aucun commentaire n'a été trouvé" });

		// check jwt user with comment's user
		if (comment.dataValues.userId != jwtUserId)
			return res
				.status(401)
				.json({ err: "Vous n'etes pas autorisé à modifier ce commentaire" });

		models.Comment.update(
			{
				...commentBody,
				updatedAt: new Date(),
			},
			{
				where: { id: id },
			}
		)
			.then(() => res.status(200).json({ message: 'Commentaire modifié' }))
			.catch((err) => res.status(500).json(err));
	});
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.commentId;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 1; // TODO

	models.Comment.findOne({
		attributes: ['id', 'userId'],
		where: { id: id },
	})
		.then((comment) => {
			// si pas de commentaire -> return 404
			if (!comment) return res.status(404).json({ error: 'Pas de commentaire à supprimer' });

			// non autorisé par jwt
			if (comment.dataValues.userId != jwtUserId)
				return res
					.status(401)
					.json({ error: "Vous n'êtes pas autorisé à supprimer ce commentaire" });

			models.Comment.destroy({ where: { id: id } })
				.then(() => res.status(204).end())
				.catch((err) => console.log(err));
		})
		.catch((err) => res.status(500).json(err));
};

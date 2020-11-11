const models = require('../models');
const jwt = require('../utils/jwt');

// Create a new disLike
exports.create = (req, res) => {
	const dislikeBody = req.body;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 2; // TODO
	const date = new Date();

	// check user
	models.User.findOne({ where: { id: jwtUserId } })
		.then((user) => {
			if (!user)
				return res
					.status(401)
					.json({ message: 'Veuillez vous connecter pour disliker ce post' });

			// check post
			models.Post.findOne({ where: { id: dislikeBody.PostId } })
				.then((post) => {
					if (!post)
						return res.status(404).json({ message: "Aucun post n'a été trouvé" });

					// check both
					models.postDislikes
						.findOne({
							where: { userId: jwtUserId, postId: dislikeBody.PostId },
						})
						.then((like) => {
							if (like)
								return res
									.status(409)
									.json({ message: 'Le post a déja été disliké' });

							models.postDislikes
								.create({
									...dislikeBody,
									UserId: jwtUserId,
									createdAt: date,
									updatedAt: date,
								})
								.then(() => {
									res.status(201).json({
										user: user.dataValues.username,
										post: post.dataValues.title,
									});
								})
								.catch((err) => {
									res.status(501).json({ err });
								});
						})
						.catch((err) => res.status(501).json(err));
				})
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Dislikes by postId from the database
exports.findAllByPost = (req, res) => {
	models.postDislikes
		.findAll({
			attributes: ['createdAt'],
			include: [
				{
					model: models.User,
					attributes: ['username'],
				},
				{
					model: models.Post,
					attributes: ['id', 'title'],
				},
			],
			where: { postId: req.params.postId },
			order: [['createdAt', 'DESC']],
		})
		.then((dislikes) => {
			if (dislikes.length <= 0)
				return res.status(404).json({ message: 'Pas de dislike à afficher' });

			return res.status(200).json(dislikes);
		})
		.catch((err) => res.status(501).json(err));
};

// Delete a Dislike with dislikeId
exports.delete = (req, res) => {
	const id = req.params.dislikeId;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 2; // TODO

	models.postDislikes
		.findOne({ where: { id: id } })
		.then((dislike) => {
			// si pas de dislike -> return 404
			if (!dislike) return res.status(404).json({ message: 'Pas de dislike à supprimer' });
			// check user
			if (dislike.dataValues.userId != jwtUserId)
				return res
					.status(401)
					.json({ message: "Vous n'etes pas autorisé à supprimer ce dislike" });
			// check post
			if (dislike.dataValues.postId != req.params.postId)
				return res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à supprimer ce dislike" });
			models.postDislikes
				.destroy({ where: { id: id } })
				.then(() => res.status(204).end())
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

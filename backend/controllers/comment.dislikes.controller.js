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
					.json({ message: 'Veuillez vous connecter pour disliker ce commentaire' });

			// check comment
			models.Comment.findOne({ where: { id: dislikeBody.CommentId } })
				.then((comment) => {
					if (!comment)
						return res
							.status(404)
							.json({ message: "Aucun commentaire n'a été trouvé" });

					// check both
					models.commentDislikes
						.findOne({
							where: { userId: jwtUserId, commentId: dislikeBody.CommentId },
						})
						.then((like) => {
							if (like)
								return res
									.status(409)
									.json({ message: 'Le commentaire a déja été disliké' });

							models.commentDislikes
								.create({
									...dislikeBody,
									UserId: jwtUserId,
									createdAt: date,
									updatedAt: date,
								})
								.then(() => {
									res.status(201).json({
										user: user.dataValues.username,
										comment: comment.dataValues.content,
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

// Retrieve all Dislikes by commentId from the database
exports.findAllByComment = (req, res) => {
	models.commentDislikes
		.findAll({
			attributes: ['createdAt'],
			include: [
				{
					model: models.User,
					attributes: ['username'],
				},
				{
					model: models.Comment,
					attributes: ['id', 'content'],
				},
			],
			where: { commentId: req.params.commentId },
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

	models.commentDislikes
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
			if (dislike.dataValues.commentId != req.params.commentId)
				return res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à supprimer ce dislike" });

			models.commentDislikes
				.destroy({ where: { id: id } })
				.then(() => res.status(204).end())
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

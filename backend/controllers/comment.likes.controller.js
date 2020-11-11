const models = require('../models');
const jwt = require('../utils/jwt');

// Create a new Like
exports.create = (req, res) => {
	const likeBody = req.body;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 2; // TODO
	const date = new Date();

	// check user
	models.User.findOne({ where: { id: jwtUserId } })
		.then((user) => {
			if (!user)
				return res
					.status(401)
					.json({ message: 'Veuillez vous connecter pour liker ce commentaire' });

			// check comment
			models.Comment.findOne({ where: { id: likeBody.CommentId } })
				.then((comment) => {
					if (!comment)
						return res
							.status(404)
							.json({ message: "Aucun commentaire n'a été trouvé" });

					// check both
					models.commentLikes
						.findOne({
							where: { userId: jwtUserId, commentId: likeBody.CommentId },
						})
						.then((like) => {
							if (like)
								return res
									.status(409)
									.json({ message: 'Le commentaire a déja été liké' });

							models.commentLikes
								.create({
									...likeBody,
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

// Retrieve all Likes by commentId from the database
exports.findAllByComment = (req, res) => {
	models.commentLikes
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
		.then((likes) => {
			if (likes.length <= 0)
				return res.status(404).json({ message: 'Pas de like à afficher' });

			return res.status(200).json(likes);
		})
		.catch((err) => res.status(501).json(err));
};

// Delete a Like with likeId
exports.delete = (req, res) => {
	const id = req.params.likeId;
	const jwtUserId = jwt.getUserId(req.headers.authorization) || 2; // TODO

	models.commentLikes
		.findOne({ where: { id: id } })
		.then((like) => {
			// si pas de like -> return 404
			if (!like) return res.status(404).json({ message: 'Pas de like à supprimer' });

			// check user
			if (like.dataValues.userId != jwtUserId)
				return res
					.status(401)
					.json({ message: "Vous n'etes pas autorisé à supprimer ce like" });

			// check comment
			if (like.dataValues.commentId != req.params.commentId)
				return res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à supprimer ce like" });

			models.commentLikes
				.destroy({ where: { id: id } })
				.then(() => res.status(204).end())
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

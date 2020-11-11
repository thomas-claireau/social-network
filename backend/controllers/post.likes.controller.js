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
					.json({ message: 'Veuillez vous connecter pour liker ce post' });

			// check post
			models.Post.findOne({ where: { id: likeBody.PostId } })
				.then((post) => {
					if (!post)
						return res.status(404).json({ message: "Aucun post n'a été trouvé" });

					// check both
					models.postLikes
						.findOne({
							where: { userId: jwtUserId, postId: likeBody.PostId },
						})
						.then((like) => {
							if (like)
								return res.status(409).json({ message: 'Le post a déja été liké' });

							models.postLikes
								.create({
									...likeBody,
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

// Retrieve all Likes by postId from the database
exports.findAllByPost = (req, res) => {
	models.postLikes
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

	models.postLikes
		.findOne({ where: { id: id } })
		.then((like) => {
			// si pas de like -> return 404
			if (!like) return res.status(404).json({ message: 'Pas de like à supprimer' });

			// check user
			if (like.dataValues.userId != jwtUserId)
				return res
					.status(401)
					.json({ message: "Vous n'etes pas autorisé à supprimer ce like" });

			// check post
			if (like.dataValues.postId != req.params.postId)
				return res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à supprimer ce like" });

			models.postLikes
				.destroy({ where: { id: id } })
				.then(() => res.status(204).end())
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

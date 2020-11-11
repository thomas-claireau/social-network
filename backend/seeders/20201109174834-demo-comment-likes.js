module.exports = {
	up: (queryInterface, Sequelize) => {
		const comments = 100;
		const likes = [];
		const date = new Date();

		for (let i = 1; i <= comments; i++) {
			likes.push({
				userId: 1,
				commentId: i,
				createdAt: date,
				updatedAt: date,
			});
		}

		return queryInterface.bulkInsert('comments__likes', likes);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('comments__likes', null, {});
	},
};

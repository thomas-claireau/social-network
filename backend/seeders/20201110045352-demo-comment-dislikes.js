module.exports = {
	up: (queryInterface, Sequelize) => {
		const comments = 100;
		const dislikes = [];
		const date = new Date();

		for (let i = 1; i <= comments; i++) {
			dislikes.push({
				userId: 1,
				commentId: i,
				createdAt: date,
				updatedAt: date,
			});
		}

		return queryInterface.bulkInsert('comments__dislikes', dislikes);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('comments__dislikes', null, {});
	},
};

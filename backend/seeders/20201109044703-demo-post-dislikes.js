module.exports = {
	up: (queryInterface, Sequelize) => {
		const posts = 10;
		const dislikes = [];
		const date = new Date();

		for (let i = 1; i <= posts; i++) {
			dislikes.push({
				userId: 1,
				postId: i,
				createdAt: date,
				updatedAt: date,
			});
		}

		return queryInterface.bulkInsert('posts__dislikes', dislikes);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('posts__dislikes', null, {});
	},
};

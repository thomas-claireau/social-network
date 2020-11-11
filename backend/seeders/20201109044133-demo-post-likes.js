module.exports = {
	up: (queryInterface, Sequelize) => {
		const posts = 10;
		const likes = [];
		const date = new Date();

		for (let i = 1; i <= posts; i++) {
			likes.push({
				userId: 1,
				postId: i,
				createdAt: date,
				updatedAt: date,
			});
		}

		return queryInterface.bulkInsert('posts__likes', likes);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('posts__likes', null, {});
	},
};

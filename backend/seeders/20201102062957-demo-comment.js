module.exports = {
	up: (queryInterface, Sequelize) => {
		const posts = 10;
		const comments = [];
		let index = 1;

		for (let i = 1; i <= posts; i++) {
			for (let j = 1; j <= posts; j++) {
				comments.push({
					id: index,
					postId: i,
					userId: 1,
					content: `comment n°${j} du post ${i}`,
					createdAt: new Date(),
					updatedAt: new Date(),
				});

				index++;
			}
		}

		return queryInterface.bulkInsert('Comments', comments);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Comments', null, {});
	},
};

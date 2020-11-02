module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Comments', [
			{
				postId: 1,
				userId: 1,
				content: 'content',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Comments', null, {});
	},
};

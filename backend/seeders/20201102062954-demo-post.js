module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Posts', [
			{
				userId: 1,
				title: 'title',
				slug: 'title',
				content: 'content',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Posts', null, {});
	},
};

const models = require('../models');

module.exports = {
	up: (queryInterface, Sequelize) => {
		const posts = [];

		for (let i = 1; i <= 10; i++) {
			posts.push({
				id: i,
				userId: 1,
				title: `title ${i}`,
				slug: `title-${i}`,
				content: `content du post ${i}`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return queryInterface.bulkInsert('Posts', posts);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Posts', null, {});
	},
};

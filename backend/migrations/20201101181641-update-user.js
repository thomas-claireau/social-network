'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			biography: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {},
};

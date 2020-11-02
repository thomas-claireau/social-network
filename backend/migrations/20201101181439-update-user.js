'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			biography: {
				allowNull: false,
				type: Sequelize.NUMBER,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {},
};

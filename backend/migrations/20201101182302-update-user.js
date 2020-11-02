'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('Users', 'biography', {
			type: Sequelize.TEXT,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('Users', 'biography', {
			type: Sequelize.STRING,
		});
	},
};

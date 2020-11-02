'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('Users', 'biography', {
			type: Sequelize.INTEGER,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn('Users', 'biography', {
			type: Sequelize.STRING,
		});
	},
};

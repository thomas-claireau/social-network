'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			firstname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			lastname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			biography: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			isAdmin: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	},
};

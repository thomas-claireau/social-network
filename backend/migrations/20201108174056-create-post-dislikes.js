'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('posts__dislikes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'cascade',
			},
			postId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
				onUpdate: 'cascade',
				onDelete: 'cascade',
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
		await queryInterface.dropTable('posts__dislikes');
	},
};

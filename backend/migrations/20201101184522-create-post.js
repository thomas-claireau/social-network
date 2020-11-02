'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Posts', {
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
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			slug: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			content: {
				allowNull: false,
				type: Sequelize.TEXT,
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

		await queryInterface.createTable('posts__likes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
		});

		await queryInterface.createTable('posts__dislikes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			postId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('posts__likes');
		await queryInterface.dropTable('posts__dislikes');
		await queryInterface.dropTable('Posts');
	},
};

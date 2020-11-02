module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					'Users',
					'password',
					{
						type: Sequelize.DataTypes.STRING,
						allowNull: false,
					},
					{ transaction: t }
				),
			]);
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn('Users', 'password', { transaction: t }),
			]);
		});
	},
};

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				email: 'example@example.com',
				password: 'password',
				firstName: 'John',
				lastName: 'Doe',
				biography: 'biography',
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};

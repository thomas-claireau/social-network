const bcrypt = require('bcrypt');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				id: 1,
				email: 'user@socialnetwork.com',
				password: bcrypt.hashSync('password', 10),
				firstName: 'John',
				lastName: 'Doe',
				username: 'thisisjohn',
				biography: 'biography',
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				email: 'admin@socialnetwork.com',
				password: bcrypt.hashSync('password', 10),
				firstName: 'John',
				lastName: 'Doe',
				username: 'thisisjohnadmin',
				biography: 'biography',
				isAdmin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};

const { error } = require('../utils');
const sql = require('./db.js');
const TABLE = 'users';

// constructor
const User = function(user) {
	this.id = user.id;
	this.email = user.email;
	this.firstname = user.firstname;
	this.lastname = user.lastname;
	this.biography = user.biography;
	this.isAdmin = user.isAdmin;
	this.createdAt = user.createdAt;
	this.updatedAt = user.updatedAt;
};

User.emailNotExist = (res) => {
	return Array.isArray(res) && res.length == 0;
};

User.create = (newUser, result) => {
	sql.query(`SELECT * FROM ${TABLE} WHERE email = '${newUser.email}' LIMIT 1`, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		if (User.emailNotExist(res)) {
			sql.query(`INSERT INTO ${TABLE} SET ?`, newUser, (err, res) => {
				if (err) {
					result(error(err), null);
					return;
				}

				result(null, { id: res.insertId, ...newUser });
			});
		} else {
			result(error('Email is already exist', 401), null);
			return;
		}
	});
};

User.findById = (userId, result) => {
	sql.query(`SELECT * FROM ${TABLE} WHERE id = ${userId}`, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		if (res.length) {
			result(null, res[0]);
			return;
		}
	});
};

User.getAll = (result) => {
	sql.query(`SELECT * FROM ${TABLE}`, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		result(null, res);
	});
};

User.updateById = (id, user, result) => {
	const date = new Date()
		.toISOString()
		.slice(0, 19)
		.replace('T', ' ');

	user.updatedAt = date;

	const data = Object.values(user);
	const keys = Object.keys(user);

	let setQuery = 'SET ';

	for (const [key, value] of Object.entries(user)) {
		setQuery += `${key} = ?`;

		if (key !== keys[keys.length - 1]) setQuery += ', ';
	}

	sql.query(`UPDATE ${TABLE} ${setQuery} WHERE id = ?`, [...data, id], (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		if (res.affectedRows == 0) {
			// not found
			result(error('User not found', 404));
			return;
		}

		result(null, { id, ...user });
	});
};

User.remove = (id, result) => {
	sql.query(`DELETE FROM ${TABLE} WHERE id = ?`, id, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		if (res.affectedRows == 0) {
			result(error('User not found', 404));
			return;
		}

		result(null, res);
	});
};

module.exports = User;

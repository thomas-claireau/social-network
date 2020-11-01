const { default: slugify } = require('slugify');
const { error } = require('../utils');
const sql = require('./db.js');
const TABLE = 'posts';

// constructor
const Post = function(post) {
	this.id = post.id;
	this.userId = post.userId;
	this.title = post.title;
	this.slug = slugify(post.title.toLowerCase(), '-');
	this.content = post.content;
	this.createdAt = post.createdAt;
	this.updatedAt = post.updatedAt;
};

Post.slugNotExist = (res) => {
	return Array.isArray(res) && res.length == 0;
};

Post.create = (newPost, result) => {
	sql.query(`SELECT * FROM ${TABLE} WHERE slug = '${newPost.slug}' LIMIT 1`, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		if (Post.slugNotExist(res)) {
			sql.query(`INSERT INTO ${TABLE} SET ?`, newPost, (err, res) => {
				if (err) {
					result(error(err), null);
					return;
				}

				result(null, { id: res.insertId, ...newPost });
			});
		} else {
			result(error('Slug is already exist', 401), null);
			return;
		}
	});
};

Post.findById = (postId, result) => {
	if (Number(postId) == NaN) {
		result(error(null, 404), null);
	} else {
		sql.query(`SELECT * FROM ${TABLE} WHERE id = ${postId}`, (err, res) => {
			if (err) {
				result(error(err), null);
			} else {
				if (Array.isArray(res) && res.length) {
					res = res[0];
					result(null, res);
				} else {
					result(error(null, 404), null);
				}
			}
		});
	}
};

Post.getAll = (result) => {
	sql.query(`SELECT * FROM ${TABLE}`, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		result(null, res);
	});
};

Post.updateById = (id, post, result) => {
	const date = new Date()
		.toISOString()
		.slice(0, 19)
		.replace('T', ' ');

	post.updatedAt = date;

	const data = Object.values(post);
	const keys = Object.keys(post);

	let setQuery = 'SET ';

	for (const [key, value] of Object.entries(post)) {
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
			result(error('Post not found', 404));
			return;
		}

		result(null, { id, ...post });
	});
};

Post.remove = (id, result) => {
	sql.query(`DELETE FROM ${TABLE} WHERE id = ?`, id, (err, res) => {
		if (err) {
			result(error(err), null);
			return;
		}

		if (res.affectedRows == 0) {
			result(error('Post not found', 404));
			return;
		}

		result(null, res);
	});
};

module.exports = Post;

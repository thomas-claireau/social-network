module.exports = {
	error: function(err, code = 500) {
		return { code, message: err };
	},
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class postLikes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.postLikes.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});

			models.postLikes.belongsTo(models.Post, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	postLikes.init(
		{
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'postLikes',
			tableName: 'posts__likes',
		}
	);
	return postLikes;
};

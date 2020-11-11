'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class postDislikes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.postDislikes.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});

			models.postDislikes.belongsTo(models.Post, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	postDislikes.init(
		{
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'postDislikes',
			tableName: 'posts__dislikes',
		}
	);
	return postDislikes;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class commentLikes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.commentLikes.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});

			models.commentLikes.belongsTo(models.Comment, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	commentLikes.init(
		{
			userId: DataTypes.INTEGER,
			commentId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'commentLikes',
			tableName: 'comments__likes',
		}
	);
	return commentLikes;
};

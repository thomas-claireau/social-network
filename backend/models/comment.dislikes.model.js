'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class commentDislikes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.commentDislikes.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
			});

			models.commentDislikes.belongsTo(models.Comment, {
				foreignKey: {
					allowNull: false,
				},
			});
		}
	}
	commentDislikes.init(
		{
			userId: DataTypes.INTEGER,
			commentId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'commentDislikes',
			tableName: 'comments__dislikes',
		}
	);
	return commentDislikes;
};

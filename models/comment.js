'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Photo);
      this.belongsTo(models.User);
    }
  }
  Comment.init({
    UserId: DataTypes.INTEGER,
    PhotoId: DataTypes.INTEGER,
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Comment tidak boleh kosong"
        },
        notEmpty: {
          msg: "Comment tidak boleh kosong"
        }
      }
    },
    PhotoId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Photo Id tidak boleh kosong"
        },
        notEmpty: {
          msg: "Photo Id tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
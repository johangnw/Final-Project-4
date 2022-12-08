'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      
      this.hasMany(models.Comment);
    }
  }
  Photo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Judul tidak boleh kosong"
        },
        notEmpty: {
          msg: "Judul tidak boleh kosong"
        }
      }
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Judul tidak boleh kosong"
        },
        notEmpty: {
          msg: "Caption tidak boleh kosong"
        }
      }
    },
    poster_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Judul tidak boleh kosong"
        },
        notEmpty: {
          msg: "Url gambar post tidak boleh kosong"
        },
        isUrl: {
          msg: "Url gambar tidak sesuai dengan format"
        }
      },
      
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
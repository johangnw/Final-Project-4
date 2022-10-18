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
    }
  }
  Photo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Judul tidak boleh kosong"
        }
      }
    },
    caption: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Caption tidak boleh kosong"
        }
      }
    },
    post_image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Url gambar post tidak boleh kosong"
        },
        isUrl: {
          msg: "Url gambar tidak sesuai dengan format"
        }
      },
      
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
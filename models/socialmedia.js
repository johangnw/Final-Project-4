'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SocialMedia.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "nama tidak boleh kosong"
        }
      }
    },
    social_media_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Url sosial media tidak boleh kosong",
        },
        isUrl: {
          msg: "Url sosial media tidak sesuai dengan format"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};
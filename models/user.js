'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo);
      this.hasMany(models.SocialMedia);
      this.hasMany(models.Comment);
    }
  }
  User.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Nama lengkap tidak boleh kosong"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      unique : {
        msg : "Email anda sudah digunakan"
      },
      validate : {
        isEmail: {
          msg: "Format email yang anda masukkan salah"
        },
        notEmpty: {
          msg : "Email tidak boleh kosong"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "This username already exist"
      },
      validate: {
        notEmpty: {
          msg: "Username tidak boleh kosong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password tidak boleh kosong"
        }
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Url gambar profile tidak boleh kosong"
        },
        isUrl: {
          msg: "Url gambar tidak sesuai dengan format"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Umur tidak boleh kosong"
        },
        isInt: {
          msg: "Umur harus berupa angka"
        }
      }
    },
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty:{
          msg: "Nomor telepon tidak boleh kosong"
        },
        isNumeric: {
          msg: "Nomor telepon harus berupa angka"
        }
      }
  }
}, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toUpperCase());
      },
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
      validate: {
        isIn: [["USER", "ADMIN"]],
      },
      set(value) {
        this.setDataValue("role", value.toUpperCase());
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING(1),
      allowNull: true,
      validate: {
        isIn: [["M", "F", "O"]],
      },
      set(value) {
        this.setDataValue("sex", value ? value.toUpperCase() : null);
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;

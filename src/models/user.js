const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toUpperCase());
      },
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      set(value) {
        this.setDataValue("username", value.toUpperCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
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
        isIn: [["M", "F"]],
      },
      set(value) {
        this.setDataValue("sex", value.toUpperCase());
      },
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;

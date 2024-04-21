const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

class Appointment extends Model {}

Appointment.init(
  {
    secureId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentInitialTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    appointmentFinalTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("MARCADA", "CANCELADA", "CONCLUIDA"),
      defaultValue: "MARCADA",
      set(value) {
        this.setDataValue("status", value.toUpperCase());
      },
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        this.setDataValue("doctorName", value.toUpperCase());
      },
    },
    specialtyName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        this.setDataValue("specialtyName", value.toUpperCase());
      },
    },
  },
  {
    sequelize,
    modelName: "appointment",
  }
);

module.exports = Appointment;

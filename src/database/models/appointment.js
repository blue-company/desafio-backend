module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    'Appointment',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: DataTypes.UUID,
      reason: DataTypes.STRING,
      appointmentDate: DataTypes.DATEONLY,
      appointmentTime: DataTypes.TIME,
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['SCHEDULED', 'COMPLETED', 'CANCELED']],
        },
        defaultValue: 'SCHEDULED',
      },
      token: DataTypes.STRING,
      isConsulted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { underscored: true, tableName: 'Appointments' }
  );

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return Appointment;
};

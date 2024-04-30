module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'Users',
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Appointment, {
      as: 'appointments',
      foreignKey: 'id',
    });
  };

  return User;
};

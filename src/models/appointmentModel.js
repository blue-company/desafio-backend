const { Model, DataTypes } = require('sequelize');

class Appointment extends Model {
    static init(sequelize) {
        super.init({
            date: {
                type: DataTypes.STRING,
                allowNull: false
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            doctor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING
            }
        }, {
            sequelize,
            modelName: 'Appointment'
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Appointment;

const { Model, DataTypes } = require('sequelize');

class Appointment extends Model {
    static init(sequelize) {
        super.init({
            date: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isDate: true 
                }
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^\d{2}:\d{2}$/ //(HH:MM)
                }
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true 
                }
            },
            doctor: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true 
                }
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

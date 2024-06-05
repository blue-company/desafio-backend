
const { Model, DataTypes } = require('sequelize');

class Appointment extends Model {
    static init(sequelize) {
        super.init({
        
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            time: {
                type: DataTypes.TIME,
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
            // appointments:
        }, { sequelize });
    }
}

module.exports = Appointment;

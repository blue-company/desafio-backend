const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) { 
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        }, { 
            sequelize,
            tableName: 'users',
            underscored: true
        }); 
    }
    static associate(models) {
        this.hasMany(models.Appointment, { foreignKey: 'user_id', as: 'appointments' });
    }
}

module.exports = User;

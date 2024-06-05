
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) { 
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING
            // appointments:
        }, { sequelize }); 
    }
}

module.exports = User;

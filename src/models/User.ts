import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize } from "../instances/mysql";
import { Consultation } from "./Consultation";

interface UserInstance extends Model {
    idUser: number,
    email: string,
    passwordHash: string,
    name: string
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
})

User.hasMany(Consultation, {foreignKey: 'user_id'})
Consultation.belongsTo(User, {foreignKey: 'user_id'})

syncronizeSequelize()

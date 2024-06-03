import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize  } from "../instances/mysql";
import { Consultation } from "./Consultation";

interface DoctorInstance extends Model {
    id: number,
    name: string,
    speciality: string,
}

export const Doctor = sequelize.define<DoctorInstance>('Doctor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'doctor',
    timestamps: false
})

Doctor.hasMany(Consultation, {foreignKey: 'doctor_id'})
Consultation.belongsTo(Doctor, {foreignKey: 'doctor_id'})

syncronizeSequelize()


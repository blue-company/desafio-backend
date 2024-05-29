import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize  } from "../instances/mysql";
import { Consultation } from "./Consultation";

interface DoctorInstance extends Model {
    idDoctor: number,
    name: string,
    speciality: string,
}

export const Doctor = sequelize.define<DoctorInstance>('Doctor', {
    idDoctor: {
        primaryKey: true,
        autoIncrement: false,
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
    tableName: 'doctors',
    timestamps: false
})

Doctor.hasMany(Consultation, {foreignKey: 'doctor_id'})
Consultation.belongsTo(Doctor, {foreignKey: 'doctor_id'})

syncronizeSequelize()


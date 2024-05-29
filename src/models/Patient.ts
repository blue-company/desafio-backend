import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize } from "../instances/mysql";
import { Consultation } from "./Consultation";

interface PatientInstance extends Model {
    idPatient: number,
    email: string,
    passwordHash: string,
    name: string
}

export const Patient = sequelize.define<PatientInstance>('Patient', {
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
    tableName: 'patients',
    timestamps: false
})

Patient.hasMany(Consultation, {foreignKey: 'patient_id'})
Consultation.belongsTo(Patient, {foreignKey: 'patient_id'})

syncronizeSequelize()

import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize } from "../instances/mysql";

interface Details {
    doctorName: string,
    username: string,
    pdf: string | undefined
}

interface ConsultationInstance extends Model {
    id: number,
    consultationDate: string,
    consultationTime: string,
    schedulingDate: string,
    doctor_id: number,
    user_id: number,
    details: Details
}

export const Consultation = sequelize.define<ConsultationInstance>('Consultation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    consultationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    consultationTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schedulingDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    details: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'consultation',
    timestamps: false
})

syncronizeSequelize()


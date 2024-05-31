import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize } from "../instances/mysql";

interface Details {
    doctorName: string,
    username: string,
    pdf: string | undefined
}

interface ConsultationInstance extends Model {
    id: number,
    token: string,
    consultationDate: string,
    consultationTime: string,
    schedulingDate: string,
    doctor_id: number,
    user_id: number,
    isCompleted: boolean,
    details: Details
}

export const Consultation = sequelize.define<ConsultationInstance>('Consultation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
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
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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


import { DataTypes, Model } from "sequelize";
import { sequelize, syncronizeSequelize } from "../instances/mysql";

interface ConsultationInstance extends Model {
    id: number,
    dateConsultation: string,
    consultationTime: string,
    schedulingDate: string,
}

export const Consultation = sequelize.define<ConsultationInstance>('Consultation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateConsultation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    consultationTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schedulingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'consultation',
    timestamps: false
})

syncronizeSequelize()


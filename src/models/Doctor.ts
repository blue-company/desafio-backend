import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/mysql";


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



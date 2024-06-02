import { medicaAppointmentDB } from "../models/medicalAppointment";
import { Connection } from "./configuration";

export class MedicalAppointRepository extends Connection{
    private static APPOINT_TABLE = "consulta";

    findAppointById = async (id: string): Promise<medicaAppointmentDB[]> => {
      const appoint: medicaAppointmentDB[] = await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).where(id);

      return appoint;
    };
  
    createAppoint = async (newAppoint: medicaAppointmentDB): Promise<medicaAppointmentDB[]> => {
      return await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).insert(newAppoint).returning("*");
    };
    
}
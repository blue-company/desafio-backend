import { medicaAppointmentDB } from "../models/medicalAppointment";
import { Connection } from "./configuration";

export class MedicalAppointRepository extends Connection{
    private static APPOINT_TABLE = "consulta";

    findAppointById = async (id: string): Promise<medicaAppointmentDB> => {
      const [appoint]: medicaAppointmentDB[] = await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).where({id});

      return appoint;
    };

    findAppointByUserId = async (user_id: string): Promise<medicaAppointmentDB[]> => {
      const appoint: medicaAppointmentDB[] = await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).where({user_id});

      return appoint;
    };
  
    createAppoint = async (newAppoint: medicaAppointmentDB): Promise<void> => {
      await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).insert(newAppoint);
    };

    editAppoint = async (oldAppoint: medicaAppointmentDB, id: string): Promise<void> => {
      await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).update(oldAppoint).where({id})
    }

    cancelAppoint = async(appointCanceled: medicaAppointmentDB, id:string): Promise<void> => {
      await Connection.conection(MedicalAppointRepository.APPOINT_TABLE).update(appointCanceled).where({id});
    }
    
}
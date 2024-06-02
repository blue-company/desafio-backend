import { createMedicalAppointmentInputDTO } from "../dtos/medicalAppointmentDTO/createMedicalAppointment.dto";
import { TokenManager } from "../utils/TokenManager";
import { NotFoundError } from "../customErrors/NotFoudError";
import { MedicalAppointRepository } from "../repository/MedicalAppointRepository";
import { UserRepository } from "../repository/UserRepository";
import { BadRequestError } from "../customErrors/BadRequestError";
import { MedicaAppointment, STATUS_APPOINTMENT } from "../models/medicalAppointment";
import { IdGerator } from "@src/utils/IdGerator";

export class MedicalAppointService{
    constructor(
        private medicalAppointRepository: MedicalAppointRepository,
        private userRepository: UserRepository,
        private tokenManager: TokenManager,
        private idGenerator: IdGerator
    ){}

    createAppoint = async(newAppoint: createMedicalAppointmentInputDTO):Promise<string> => {
        const payloadUser = this.tokenManager.getPayload(newAppoint.token);

        if(!payloadUser)
            throw new BadRequestError('This token is not invalid.');

        const userExist = await this.userRepository.findUserById(payloadUser.id);

        if(!userExist)
            throw new NotFoundError('This user is not found.');

        const newAppointDB = new MedicaAppointment(
            this.idGenerator.gerate(),
            payloadUser.name, 
            STATUS_APPOINTMENT.NEW, 
            newAppoint.data,
            new Date().toISOString(),
            payloadUser.id,
            newAppoint.description
        );

        const appotointCreated = await this.medicalAppointRepository.createAppoint(newAppointDB.toMedicalAppointDB());

        

        return "Medical appoint created sucessfully";

        // const userByAppoint = await this.medicalAppointRepository.findAppointByUserId(payloadUser.id);


        // const pacientExist = await MedicalAppointService.findAppointById();
    };
}
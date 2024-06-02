import { createMedicalAppointmentInputDTO, createMedicalAppointmentOutputDTO } from "../dtos/medicalAppointmentDTO/createMedicalAppointment.dto";
import { TokenManager } from "../utils/TokenManager";
import { NotFoundError } from "../customErrors/NotFoudError";
import { MedicalAppointRepository } from "../repository/MedicalAppointRepository";
import { UserRepository } from "../repository/UserRepository";
import { BadRequestError } from "../customErrors/BadRequestError";
import { MedicaAppointment, STATUS_APPOINTMENT } from "../models/medicalAppointment";
import { IdGerator } from "@src/utils/IdGerator";
import { getMedicalAppointmentInputDTO, getMedicalAppointmentOutputDTO } from "@src/dtos/medicalAppointmentDTO/getMedicalAppointment.dto";
import { PDFGenarator } from "@src/utils/PDFGenarator";
import { Buffer } from 'buffer'
import { editMedicalAppointmentInputDTO, editMedicalAppointmentOutputDTO } from "@src/dtos/medicalAppointmentDTO/editMedicalAppointment.dto";
import { deleteMedicalAppointmentInputDTO } from "@src/dtos/medicalAppointmentDTO/deletMedicalAppointment.dto";

export class MedicalAppointService{
    constructor(
        private medicalAppointRepository: MedicalAppointRepository,
        private userRepository: UserRepository,
        private tokenManager: TokenManager,
        private idGenerator: IdGerator,
        private PDFGerator: PDFGenarator
    ){}

    getAppoint = async(appointInfo: getMedicalAppointmentInputDTO): Promise<getMedicalAppointmentOutputDTO> => {
        const {token} = appointInfo;

        const userPayload = this.tokenManager.getPayload(token);

        if(!userPayload)
            throw new BadRequestError("Send a invalid token user")

        const [userLogged] = await this.userRepository.findUserById(userPayload.id);

        if(!userLogged)
            throw new NotFoundError("This user is not logged or not exist.");

        const allAppoints = await this.medicalAppointRepository.findAppointByUserId(userLogged.id);
        console.log(allAppoints)

        let linkForAppoints: string[] = [];

        for (const appoint of allAppoints) {
            const link = `http://localhost:3003/medicalAppoint/appoint/${userLogged.id}&${appoint.id}`;

            linkForAppoints.push(link);
        }

        const response = {
            message: "All query links of medical appointment",
            links: linkForAppoints
        }

        return response;
    }

    getAppointByIdUser = async(ids: {idUser: string, idAppoint: string}): Promise<Buffer> => {
        const {idUser, idAppoint} = ids;
        const [userExist] = await this.userRepository.findUserById(idUser);

        if(!userExist)
            throw new NotFoundError("This user is not exist.")

        const appoint = await this.medicalAppointRepository.findAppointById(idAppoint);

        if(!appoint)
            throw new NotFoundError("This appoint don`t exist or not registered.");

        const appointPL = new MedicaAppointment(
            appoint.id,
            appoint.name,
            appoint.status,
            appoint.data,
            appoint.created_at,
            appoint.user_id,
            appoint.description,
            appoint.updated_at,
        )

        const pdfAppointDetails:Buffer = this.PDFGerator.generatePDF(appointPL, userExist.name);

        return pdfAppointDetails;
    }

    createAppoint = async(newAppoint: createMedicalAppointmentInputDTO):Promise<createMedicalAppointmentOutputDTO> => {
        const {token, data, description} = newAppoint;
        
        const payloadUser = this.tokenManager.getPayload(token);

        if(!payloadUser){
            throw new BadRequestError('This token is not invalid.');
        }

        const [userExist] = await this.userRepository.findUserById(payloadUser.id);

        if(!userExist)
            throw new NotFoundError('This user is not found.');

        const newAppointPL = new MedicaAppointment(
            this.idGenerator.gerate(),
            payloadUser.name, 
            STATUS_APPOINTMENT.NEW, 
            data,
            new Date().toISOString(),
            userExist.id,
            description
        );

        const newAppointDB = newAppointPL.toMedicalAppointDB();

        await this.medicalAppointRepository.createAppoint(newAppointDB);

        const appointCreated = this.medicalAppointRepository.findAppointByUserId(userExist.id);

        const [appoint] = (await appointCreated).slice(-1);
        
        const link = `http://localhost:3003/medicalAppoint/appoint/${userExist.id}&${appoint.id}`;

        const response = {
            message: "Query link of medical appointment",
            link
        }

        return response;
    };

    editAppoint = async(appointForEdit: editMedicalAppointmentInputDTO):Promise<editMedicalAppointmentOutputDTO> => {
        const {token, id, name, data, status, description} = appointForEdit;
        
        const payloadUser = this.tokenManager.getPayload(token);

        if(!payloadUser){
            throw new BadRequestError('This token is not invalid.');
        }

        const [userExist] = await this.userRepository.findUserById(payloadUser.id);

        if(!userExist)
            throw new NotFoundError('This user is not found.');

        const oldAppoint = await this.medicalAppointRepository.findAppointById(id);

        if(!oldAppoint)
            throw new NotFoundError("This appoint not exist or id informed is incorrect.")

        name && (oldAppoint.name = name);
        data && (oldAppoint.data = data);
        description && (oldAppoint.description = description);
        status && (oldAppoint.status = status);
        oldAppoint.updated_at = new Date().toISOString();

        await this.medicalAppointRepository.editAppoint(oldAppoint, id);

        const link = `http://localhost:3003/medicalAppoint/appoint/${userExist.id}&${id}`;

        const response = {
            message: "Appointment edited, created a new link for him.",
            link: link
        }

        return response;
    };

    delete = async (appointForDelete: deleteMedicalAppointmentInputDTO):Promise<string> => {
        const {token, id} = appointForDelete;
        
        const payloadUser = this.tokenManager.getPayload(token);

        if(!payloadUser){
            throw new BadRequestError('This token is not invalid.');
        }

        const [userExist] = await this.userRepository.findUserById(payloadUser.id);

        if(!userExist)
            throw new NotFoundError('This user is not found.');

        await this.medicalAppointRepository.deleteAppoint(id);

        return "Item deleted sucessfully.";
    }
}
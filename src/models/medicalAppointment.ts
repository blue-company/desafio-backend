export enum STATUS_APPOINTMENT{
    NEW = "NEW",
    IN_PROCESS = "IN PROCESS",
    PENDING = "PENDING",
    FINISHED = "FINISHED",
}

export interface medicaAppointmentDB{
    id: string;
    name: string;
    description?: string;
    status: STATUS_APPOINTMENT;
    data: string;
    created_at: string;
    updated_at?: string;
    user_id:string
}

export interface medicaAppointmentTP{
}

export class MedicaAppointment{

    constructor(
        private _id: string,
        private _name: string,
        private _status: STATUS_APPOINTMENT,
        private _data: string,
        private _createdAt: string,
        private _userId: string,
        private _description?: string,
        private _updatedAt?: string
    ){}

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    
    public get status(): STATUS_APPOINTMENT {
        return this._status;
    }
    public set status(value: STATUS_APPOINTMENT) {
        this._status = value;
    }

    public get createdAt(): string {
        return this._createdAt;
    }
    public set createdAt(value: string) {
        this._createdAt = value;
    }

    public get updatedAt(): string | undefined {
        return this._updatedAt;
    }
    public set updatedAt(value: string) {
        this._updatedAt = value;
    }

    public get data(): string {
        return this._data;
    }
    public set data(value: string) {
        this._data = value;
    }

    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
  

    public toMedicalAppointDB():medicaAppointmentDB{
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            status: this.status,
            data: this.data,
            created_at: this.createdAt,
            user_id: this.userId,
            updated_at: this.updatedAt
        }
    }

    // public toMedicalAppointPayloadModel(): medicaAppointmentTP{

    // }
}
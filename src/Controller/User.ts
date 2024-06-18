import { User } from "@prisma/client";
import { UserModel } from "../Models/User";
import { Request, Response } from "express";

export class UserController{
    private userModel: UserModel;
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async createUser(req: Request, res: Response) {
        const cUser: User = req.body;

        try {
            const create = await this.userModel.createUser(cUser);
            return res.status(201).json(create);
        } catch (error) {
            throw error;
        }
    }

    async finduser(req: Request, res: Response) {
        const { name } = req.query
        
        if (typeof name !== 'string') {
            res.status(400).json({ message: 'Invalid name parameter' });
            return;
        }
        try {
            const user = await this.userModel.findUser(name);
            if(user){
                return res.status(200).json(user)
            }else{
                return res.status(400).json({message: "Usuário não encontrado!"});
            }
        } catch (error) {
            throw error;
        }
    }
}
import { UserModel } from "../Models/User";
import { verifyPassword } from "../utils/encriptDecript";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config()

export class AuthController {

    private userModel: UserModel;
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        if(!email || !password){
            res.status(401).json({message: "Acesso negado!"})
        }
        console.log('email:', email);
        try {
            const verify = await this.userModel.login(email);
            if(!verify.name || !verify.email){
                res.status(401).json({message: "E-mail não existe"})
                return;
            }
            const verifypass = await verifyPassword(password, verify.password ?? '' )
            if(verifypass === false){
                res.status(401).json({message: "Senha incorreta!"})
                return;
            }
            const SECRET = process.env.SECRET;
            if (!SECRET) {
                throw new Error("SECRET_KEY environment variable is not defined");
              }
            const token = jwt.sign({id: verify.id, name: verify.name}, SECRET, { expiresIn: '24h' });
            res.json({ token });
            
        } catch (error) {
            throw error
        }
    }
}
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        res.status(401).json({Message: "Acesso negado"});
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET ?? "");
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(500).json({Message: "Não Autorizado"});
    }

}
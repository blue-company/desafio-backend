import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface AuthRequest extends Request {
    id?: number,
    username?: string,
    email?: string
}

export const Auth = {
    private: async (req: AuthRequest, res: Response, next: NextFunction) => {
        let sucess = false
        if (req.headers.authorization) {
            let [authType, token] = req.headers.authorization.split(' ')
            if (authType === 'Bearer') {
                try {
                    const decoded: any = JWT.verify(token, process.env.JWT_SECRET_KEY as string)
                    if (decoded) {
                            req.id = decoded.id,
                            req.username = decoded.name,
                            req.email = decoded.name
                        sucess = true
                    }
                } catch (err: any) {
                    return res.status(400).json({ error: err.message })
                }
            }
        }

         if(sucess) {
            next()
         } else {
            return res.status(400).json({err: 'Não autorizado'})
         }
    }
}
import { Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import { User } from "../models/User";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


interface CredentialsLogin {
    email: string,
    password: string,
}

interface CredentialsRegister extends CredentialsLogin {
    name: string,

}

export const register = async (req: Request, res: Response) => {
    try {
        let { name, email, password }: CredentialsRegister = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ err: 'Preencha todos os campos' })
        }

        if (!isEmail(email)) {
            return res.status(400).json({ err: "Email inválido" })
        }

        let hasUser = await User.findOne({ where: { email } })
        if (hasUser) {
            return res.status(400).json({ err: 'E-mail já cadastrado' })
        }

        let passwordHash = await bcrypt.hash(password, 10)

        let newUser = await User.create({
            email,
            passwordHash,
            name
        })

        let token = JWT.sign(
            { id: newUser.idUser, name: newUser.name, email: newUser.email },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '2h' }
        )

        return res.status(201).json({ newUser, token })

    } catch (err) {
        return res.status(400).json({ err })
    }
}


export const login = async (req: Request, res: Response) => {

}
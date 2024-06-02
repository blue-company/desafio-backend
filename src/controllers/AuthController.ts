import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/AuthService";
import { generateJWT } from "../utils/generateJwtToken";

interface CredentialsLogin {
    email: string,
    password: string,
}

export const register = async (req: Request, res: Response) => {
    try {
        let { name, email, password } = req.body

        let newUser = await registerUser({ name, email, password })

        let token = generateJWT(newUser.id, newUser.name, newUser.email)

        return res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, token })

    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let { email, password }: CredentialsLogin = req.body

        let user = await loginUser({ email, password })

        let token = generateJWT(user.id, user.name, user.email)

        return res.status(201).json({ id: user.id, name: user.name, token })

    } catch (err: any) {
        return res.status(400).json({ err: err.message })
    }
}


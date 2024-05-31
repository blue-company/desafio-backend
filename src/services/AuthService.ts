
import { User } from "../models/User";
import { isValidEmail } from "../utils/validators";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

interface CredentialsLogin {
    email: string,
    password: string,
}

interface CredentialsRegister extends CredentialsLogin {
    name: string,
}

export const hasUser = async (email: string) => {
    let user = await User.findOne({ where: { email } })
    if (user) {
        throw new Error('E-mail já cadastrado');
    }
}


export const registerUser = async (credentials: CredentialsRegister) => {
    let { name, email, password } = credentials

    if (!name || !email || !password) {
        throw new Error('Preencha todos os campos')
    }

    isValidEmail(email)

    await hasUser(email)

    let passwordHash = await bcrypt.hash(password, 10)

    let newUser = await User.create({
        email,
        passwordHash,
        name: name.trim()
    })

    return newUser
}


export const loginUser = async (credentials: CredentialsLogin) => {
    let { email, password } = credentials

    if (!email || !password) {
        throw new Error('Preencha todos os campos!')
    }

    let user = await User.findOne({ where: { email } })

    if (!user) {
        throw new Error('Email e/ou senha inválidos')
    }

    let passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
        throw new Error('Email e/ou senha inválidos')
    }
    
    return user
}

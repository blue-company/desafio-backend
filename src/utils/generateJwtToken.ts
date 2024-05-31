import JWT from 'jsonwebtoken'

export const generateJWT = (id: number, name: string, email: string) => {
    let token = JWT.sign({ id, name, email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '2h' })

    return token 
}


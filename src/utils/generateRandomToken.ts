import crypto from 'crypto'

export const generateToken = (length: number) => {
    return crypto.randomBytes(length).toString('hex')
}




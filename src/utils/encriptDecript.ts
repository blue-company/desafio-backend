import bcrypt from 'bcrypt'

export async function encrypt(password: string){
    const saltRouds = 10;

    const salt = await bcrypt.genSalt(saltRouds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}
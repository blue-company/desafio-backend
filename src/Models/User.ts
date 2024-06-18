import { User } from '@prisma/client';
import { prisma } from '../db/prisma/client';
import { encrypt } from '../utils/encriptDecript';

export class UserModel {
    async createUser(res: User){
        const consult = await prisma.user.findUnique({
            where: {email: res.email}
        })
        if(consult){
            return {Message: "Usuário já existe"}
        }else{
            const create = await prisma.user.create({
                data:{
                    name: res.name,
                    email: res.email,
                    password: await encrypt(res.password),
                    age: res.age,
                    sexo: res.sexo
                }
            })
            return { message: `Usuário criado: ${create.name}` }
        }
    }

    async login(email: string){
        
        const login = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })
        return {id: login?.id, name: login?.name, email: login?.email, password: login?.password}
    }

    async findUser(name:string) {
        const user = await prisma.user.findFirst({
            where:{
                name,
            }
        })
        return user
    }
}

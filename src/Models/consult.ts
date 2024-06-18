import { prisma } from '../db/prisma/client';
import { Consult } from '@prisma/client';
import { RandomNumber } from '../utils/generateNumber';

export class ConsultModel {
    async createConsult(data: Consult, id: number) {
        return await prisma.consult.create({
            data:{
                doctor: data.doctor,
                protocol: RandomNumber(),
                dateRequest: new Date(data.dateRequest),
                observation: data.observation,
                user: {
                    connect:{
                        id,
                    }
                }
            }
        })
    }

    async findConsult(id: number, protocol: string) {
        const consult = await prisma.consult.findUnique({
            where: {
                user:{
                    id,
                },
                protocol,
            }
        })

        return consult
    }

    async editConsult (data: Consult, protocol: any) {
        const consult = await prisma.consult.findUnique({
            where: { protocol }
        })
        await prisma.consult.update({
            where: { protocol },
            data: {
                doctor: data.doctor ?? consult?.doctor,
                dateRequest: new Date(data.dateRequest ?? consult?.dateRequest),
                observation: data.observation ?? consult?.observation,
            }
        })

        return { Message: 'Dados alterados' }
    }

    async cancelConsult (id: number, protocol: any) {
        await prisma.consult.delete({
            where: { 
                user:{
                    id,
                },
                protocol
            }
        })

        return { Message: 'Consulta cancelada!' }
    }
}
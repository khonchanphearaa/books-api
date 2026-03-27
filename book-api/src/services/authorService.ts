import { error } from 'node:console';
import prisma from '../utils/prisma.js';
import { Gender, Prisma } from '@prisma/client';

export const getAll = async () => {
    return await prisma.author.findMany({
        include: { _count: { select: { books: true } } }
    })
}

export const getById = async (id: string) => {
    let author = await prisma.author.findUnique({
        where: { id: parseInt(id as string, 10) },
    })
    if (!author) {
        throw new Error('Author not found');
    }
    return author;
}

export const update = async (id: string, data: { name: string; email: string; gender: any }) => {
    let isExist = await prisma.author.findUnique({
        where: { id: parseInt(id, 10) },
    })
    if (!isExist) {
        throw new Error('Author not found');
    }
    try {
        return await prisma.author.update({
            where: { id: parseInt(id, 10) },
            data: {
                name: data.name,
                email: data.email,
                gender: data.gender,
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new Error('Invalid input. gender must be M, F, or UNKNOWN');
        }
        throw error;
    }
}
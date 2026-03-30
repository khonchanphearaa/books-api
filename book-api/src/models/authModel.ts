import prisma from '../utils/prisma.js';
import { Gender, Prisma } from '@prisma/client';


export const getById = async (id: string) => {
    let author = await prisma.author.findUnique({
        where: { id: parseInt(id as string, 10) },
    })
    return author;
}

export const getAll = async () =>{
    return await prisma.author.findMany({
        include: { _count: { select: { books: true } } }
    })
}


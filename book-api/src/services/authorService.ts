import { error } from 'node:console';
import prisma from '../utils/prisma.js';
import { Gender, Prisma } from '@prisma/client';

import * as authModel from '../models/authModel.js';

export const getAll = async () => {
    return await authModel.getAll();
}

export const getById = async (id: string) => {
    let author = await authModel.getById(id);
    if (!author) {
        throw new Error('Author not found');
    }
    return author;
}

export const update = async (id: string, data: { name: string; email: string; gender: any }) => {
    let isExist = await authModel.getById(id);
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
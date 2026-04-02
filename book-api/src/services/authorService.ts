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

export const remove = async (id: string) => {
    let isExist = await authModel.getById(id);
    if (!isExist) {
        throw new Error('Author not found');
    }
    try {
        return await prisma.author.delete({
            where: { id: parseInt(id, 10) }
        });
    } catch (error) {
            throw error;
    }
}

export const create = async (data: { name: string; email: string; gender: any }) => {
    if (!data.name || !data.email) {
        throw new Error('Missing required fields: name, email');
    }

    const normalizedGender = data.gender ?? Gender.UNKNOWN;
    if (!Object.values(Gender).includes(normalizedGender)) {
        throw new Error('Invalid input. gender must be M, F, or UNKNOWN');
    }

    try {
        const newAuthor = await prisma.author.create({
            data: {
                name: data.name,
                email: data.email,
                gender: normalizedGender
            }
        });
        return newAuthor;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('Email already exists');
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new Error('Invalid input. gender must be M, F, or UNKNOWN');
        }
        throw error;
    }
}
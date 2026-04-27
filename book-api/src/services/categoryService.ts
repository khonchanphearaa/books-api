import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const isDuplicateError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
    return error instanceof Prisma.PrismaClientKnownRequestError;
}

export const getAll = async () =>{
    const allCategories = await prisma.category.findMany({
        include: { _count: {select: {books: true}} }
    })
    return allCategories;
}

export const getById = async (id: string) => {
    let category = await prisma.category.findUnique({
        where: {id: parseInt(id, 10)},
    })
    if(!category){
        throw new Error('Category not found');
    }
    return category;
}

export const update = async(id: string, data: {name: string}) => {
    let isExist = await prisma.category.findUnique({
        where: {id: parseInt(id, 10)},
    })
    if(!isExist){
        throw new Error('Category not found');
    }
    const updatedCategory = await prisma.category.update({
        where: {id: parseInt(id, 10)},
        data
    })
    return updatedCategory;
}

export const remove =  async (id: string) => {
    let isExist = await prisma.category.findUnique({
        where: {id: parseInt(id, 10)},
    })
    if(!isExist){
        throw new Error('Category not found');
    }
    await prisma.category.delete({
        where: {id: parseInt(id, 10)},
    })  
}

export const create = async (data: {name: string}) => {
    if(!data.name){
        throw new Error('Missing required field: name');
    }
    let newCategory = await prisma.category.create({
        data
    })
    if(isDuplicateError(newCategory)){
        throw new Error('Category name already exists');
    }
    return newCategory;
}
import type { Request, Response } from 'express';
import { sendResponse } from '../utils/response.js';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';
import * as categoryService from '../services/categoryService.js';

const isDuplicateError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        await categoryService.create({ name });
        return sendResponse(res, 201, 'Create category success');
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
    
}

/* Get all categories */
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAll();
        return sendResponse(res, 200, 'Get all categories success', categories);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getById(id as string);
        return sendResponse(res, 200, 'Get category by id success', category);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await categoryService.update(id as string, name);
        return sendResponse(res, 200, 'Update success');
    } catch (error: any) {
        return sendResponse(res, 500, error.message)
    }

}


export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await categoryService.remove(id as string);
        return sendResponse(res, 200, 'Delete category success');
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
}
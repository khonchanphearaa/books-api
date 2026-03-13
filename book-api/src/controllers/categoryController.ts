import type { Request, Response } from 'express';
import { sendResponse } from '../utils/response.js';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/* Create a new category */
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: { name }
        });

        return sendResponse(res, 201, 'Create a category success', newCategory);
    } catch (error) {
        return sendResponse(res, 500, 'Error creating category');
    }
}

/* Get all categories */
export const getAllCategories = async (req: Request, res: Response) => {
    const allCategories = await prisma.category.findMany({

        /* Shows how many books are in each category */
        include: { _count: { select: { books: true } } }
    })
    return sendResponse(res, 200, 'Get all categories success', allCategories);
}

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id as string, 10) },
        })
        if (!category) {
            return sendResponse(res, 404, 'Create not found')
        }

        return sendResponse(res, 200, 'Get category by id success', category);
    } catch (error) {
        return sendResponse(res, 500, 'Error get category by id');
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const categoryExisting = await prisma.category.findUnique({
            where: { id: parseInt(id as string, 10) },
        })
        console.log(categoryExisting);
        if (!categoryExisting) {
            return sendResponse(res, 404, 'Category not found');
        }
        const updateCategory = await prisma.category.update({
            where: { id: parseInt(id as string, 10) },
            data: { name }
        })

        return sendResponse(res, 200, 'Category updated successfully', updateCategory);
    } catch (error) {
        return sendResponse(res, 500, 'Error updating category');
    }

}


export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existing = await prisma.category.findUnique({
            where: { id: parseInt(id as string, 10) }
        });

        if (!existing) {
            return sendResponse(res, 404, 'Category not found');
        }

        await prisma.category.delete({
            where: { id: parseInt(id as string, 10) }
        });

        return sendResponse(res, 200, 'Delete category success');
    } catch (error) {
        return sendResponse(res, 500, 'Failed to delete category');
    }
}
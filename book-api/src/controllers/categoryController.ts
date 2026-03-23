import type { Request, Response } from 'express';
import { sendResponse } from '../utils/response.js';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';

const isDuplicateError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
};

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: { name }
        });

        if (isDuplicateError(newCategory)) {
            return res.status(400).json({ message: 'Category name already exists' });
        }
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
            return res.status(404).json({ message: 'Category not found' });
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
            return res.status(404).json({ message: 'Category not found' });
        }
        const updateCategory = await prisma.category.update({
            where: { id: parseInt(id as string, 10) },
            data: { name }
        })


        return sendResponse(res, 200, 'Category updated successfully', updateCategory);
    } catch (error) {
        if (isDuplicateError(error)) {
            return res.status(400).json({ message: 'Category name already exists', error: error.message });
        }
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
            return res.status(404).json({ message: 'Category not found' });
        }

        await prisma.category.delete({
            where: { id: parseInt(id as string, 10) }
        });

        return sendResponse(res, 200, 'Delete category success');
    } catch (error) {
        return sendResponse(res, 500, 'Failed to delete category');
    }
}
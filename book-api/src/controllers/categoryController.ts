import type {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/* Create a new category */
export const createCategory = async (req: Request, res: Response) =>{
    const {name} = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: { name }
        });
        res.status(201).json({
            message: 'Create a category success',
            newCategory
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating category'
        })
    }
}

/* Get all categories */
export const getAllCategories = async (req: Request, res: Response) =>{
    const allCategories = await prisma.category.findMany({

        /* Shows how many books are in each category */
        include: { _count: { select: { books: true } } }
    })
    res.status(200).json({
        message: 'Get all categories success',
        allCategories
    })
}

export const getCategoryById = async (req: Request, res: Response) =>{
    const {id} = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: {id: parseInt(id as string, 10)},
        })
        if(!category){
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        res.status(200).json({
            message: 'Get category by id success',
            category
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching category'
        })
    }
}

export const updateCategory = async (req: Request, res: Response) =>{
    const {id}=req.params;
    const {name}=req.body;
    try {
        const categoryExisting = await prisma.category.findUnique({
            where: {id: parseInt(id as string, 10)},
        })
        console.log(categoryExisting);
        if(!categoryExisting){
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        const updateCategory = await prisma.category.update({
            where: {id: parseInt(id as string, 10)},
            data: {name}
        })
        res.status(200).json({
            message: 'Category updated successfully',
            updateCategory
        })

    } catch (error) {
        res.status(500).json({
            message: 'Error updating category'
        })
    }
    
}


export const deleteCategory = async (req: Request, res: Response) =>{
    const {id} = req.params;
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

        return res.status(200).json({ message: 'Delete category success' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete category' });
    }
}
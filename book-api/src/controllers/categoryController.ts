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

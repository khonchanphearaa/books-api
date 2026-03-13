import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/* Get all books */
export const getAllBooks = async (req: Request, res: Response) =>{
    const allBooks = await prisma.book.findMany({
        include: { category: true }
    });

    res.status(200).json({
        message: 'Get books success',
        allBooks
    })
}

 
/* Get a book by Id */
export const getBookById = async (req: Request, res: Response) =>{
    const { id } = req.params;

    const bookId = await prisma.book.findUnique({
        where: { id: parseInt(id as string, 10) }
    });

    if (!bookId) {
        return res.status(404).json({ message: 'Book not found' });
    }
    return res.json(bookId);
}

/* Add a new book */
export const addBook = async (req: Request, res: Response) =>{
    const {title, price, author, cover, description, categoryId} = req.body;
    try {
        const newBook = await prisma.book.create({
            data:{ title, price, author, cover, description, categoryId: Number(categoryId) },
            include: { category: true }
        });
        res.status(201).json({
            message: 'Create a book success',
            newBook
        })
    } catch (error) {
        res.status(500).json({error: 'Failed to create a book'});
    }
}

/* Update a book */
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price, author, cover, description, categoryId } = req.body;

    try {
        const existing = await prisma.book.findUnique({
            where: { id: parseInt(id as string, 10) }
        });

        if (!existing) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const updatedBook = await prisma.book.update({
            where: { id: parseInt(id as string, 10) },
            data: { title, price, author, cover, description, categoryId },
            include: { category: true }
        });

        return res.status(200).json({
            message: 'Update book success',
            updatedBook
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update book' });
    }
}

/* Delete a book */
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existing = await prisma.book.findUnique({
            where: { id: parseInt(id as string, 10) }
        });

        if (!existing) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await prisma.book.delete({
            where: { id: parseInt(id as string, 10) }
        });

        return res.status(200).json({ message: 'Delete book success' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete book' });
    }
}



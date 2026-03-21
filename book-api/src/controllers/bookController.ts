import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.js';
import { sendResponse } from '../utils/response.js';

const isDuplicateError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
};

/* Get all books */
export const getAllBooks = async (req: Request, res: Response) => {
    const allBooks = await prisma.book.findMany({
        include: { category: true }
    });

    return sendResponse(res, 200, 'Get books success', allBooks);
}


/* Get a book by Id */
export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const bookId = await prisma.book.findUnique({
        where: { id: parseInt(id as string, 10) }
    });

    if (!bookId) {
        return res.status(404).json({ message: 'Book not found' });
    }
    return sendResponse(res, 200, 'Get book by id success', bookId);
}

/* Add a new book */
export const addBook = async (req: Request, res: Response) => {
    const { title, price, cover, description, categoryId, authorId } = req.body;
    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                price,
                cover,
                description,
                authorId: Number(authorId),
                categoryId: Number(categoryId),
            },
            include: { category: true }
        });
        return sendResponse(res, 201, 'Create a book success', newBook);
    } catch (error) {
        if (isDuplicateError(error)) {
            return res.status(400).json({ message: 'Book title already exists' });
        }

        return sendResponse(res, 500, 'Failed to create a book');
    }
}

/* Update a book */
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price, cover, description, categoryId, authorId } = req.body;

    try {
        const existing = await prisma.book.findUnique({
            where: { id: parseInt(id as string, 10) }
        });

        if (!existing) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const updatedBook = await prisma.book.update({
            where: { id: parseInt(id as string, 10) },
            data: { title, price, cover, description, categoryId, authorId },
            include: { category: true }
        });

        return sendResponse(res, 200, 'Update book success', updatedBook);
    } catch (error) {
        if (isDuplicateError(error)) {
            return res.status(400).json({ message: 'Book title already exists', error: error.message });
        }

        return sendResponse(res, 500, 'Failed to update book');
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

        return sendResponse(res, 200, 'Delete book success');
    } catch (error) {
        return sendResponse(res, 500, 'Failed to delete book');
    }
}



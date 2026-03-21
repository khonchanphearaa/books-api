import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import { Gender, Prisma } from '@prisma/client';
import { sendResponse } from '../utils/response.js';

export const authorController = {
    async CreateAuthor(req: Request, res: Response) {
        try {
            const { name, email, gender } = req.body;
            const newAutor = await prisma.author.create({
                data: { name, email, gender: gender as Gender }
            })
            return sendResponse(res, 201, 'Create author success', newAutor);
        } catch (error) {
            let emailExist = error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
            let invalidGender = error instanceof Prisma.PrismaClientValidationError;

            if (emailExist) {
                return res.status(400).json({ message: 'Email already exists' });
            } else if (invalidGender) {
                return res.status(400).json({ message: 'Invalid input. gender must be M, F, or UNKNOWN' })
            } else {
                return sendResponse(res, 400, 'Failed to create author');
            }
        }
    },

    async getAllAuthors(req: Request, res: Response) {
        try {
            const allAuthors = await prisma.author.findMany({
                include: {
                    _count: { select: { books: true } }
                }
            })
            return sendResponse(res, 200, 'Get all authors success', allAuthors);
        } catch (error) {
            return sendResponse(res, 400, 'Failed to get all authors');
        }
    },

    async getAuthorById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const author = await prisma.author.findUnique({
                where: { id: parseInt(id as string, 10) },
            });

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }
            return sendResponse(res, 200, 'Get author by id success', author);
        } catch (error) {
            return sendResponse(res, 400, 'Failed to get author by id');
        }
    },

    /* Comming handler implementation Update, Delete of author */
}




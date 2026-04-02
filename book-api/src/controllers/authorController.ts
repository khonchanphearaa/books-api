import type { Request, Response } from 'express';
import { Gender } from '@prisma/client';
import { sendResponse } from '../utils/response.js';
import { getAll, getById, remove, update, create } from '../services/authorService.js';

export const authorController = {
    async CreateAuthor(req: Request, res: Response) {
        try {
            const { name, email, gender } = req.body;
            const newAutor = await create({ name, email, gender: gender as Gender });
            return sendResponse(res, 201, 'Create author success', newAutor);
        } catch (error: any) {
            return sendResponse(res, 400, error.message);
        }
    },

    async getAllAuthors(req: Request, res: Response) {
        try {
            const allAuthors = await getAll();
            return sendResponse(res, 200, 'Get all authors success', allAuthors);
        } catch (error: any) {
            return sendResponse(res, 400, error.message);
        }
    },

    async getAuthorById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const author = await getById(id as string);
            return sendResponse(res, 200, 'Get author by id success', author);
        } catch (error: any) {
            return sendResponse(res, 400, error.message);
        }
    },

    async updateAuthor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, gender } = req.body;
            const updatedAuthor = await update(id as string, { name, email, gender: gender as Gender });
            return sendResponse(res, 200, 'Update author success', updatedAuthor);
        } catch (error: any) {
            return sendResponse(res, 400, error.message);
        }
    },

    async deleteAuthor(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await remove(id as string);
            return sendResponse(res, 200, 'Delete author success');
        } catch (error: any) {
            return sendResponse(res, 400, error.message);
        }
    }
}




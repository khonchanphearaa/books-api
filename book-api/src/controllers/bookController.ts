import type { Request, Response } from 'express';
import { books } from '../data/books.js';
import type { Book } from '../models/book.js';

/* Get all books */
export const getAllBooks = (req: Request, res: Response) =>{
    res.json(books);
}

 
/* Get a book by Id */
export const getBookById = (req: Request, res: Response) =>{
    const { id } = req.params;

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid book id' });
    }

    const book = books.find((b) => b.id === parseInt(id, 10));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    return res.json(book);
}

/* Add a new book */
export const addBook = (req: Request, res: Response) =>{
    const newBook: Book = {
        id: books.length + 1,
        ...req.body
    }
    books.push(newBook);
    return res.status(201).json(newBook);
}


/* Update a book */
export const updateBook = (req: Request, res: Response) =>{
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid book id' });
    }
    const index = books.findIndex((b) => b.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    const existingBook = books[index];
    if (!existingBook) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const updatedBook: Book = {
        ...existingBook,
        ...req.body,
        id: existingBook.id
    };

    books[index] = updatedBook;
    return res.json(updatedBook);
}

/* Delete a book */
export const deleteBook = (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid book id' });
    }

    const index = books.findIndex((b) => b.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(index, 1);
    return res.status(204).send();
}
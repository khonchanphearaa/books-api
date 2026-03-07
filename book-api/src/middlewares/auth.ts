import type { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers['x-role'];
    if (userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin only' });
    }
}
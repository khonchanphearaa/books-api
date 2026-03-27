import type { Response } from 'express';

export const sendResponse = (
    res: Response, 
    status: number, 
    message: string, 
    data?: any, 
    error?: any
) => {
    const responseBody: any = {
        success: status < 400,
        message,
    };

    if (data !== undefined && data !== null) {
        responseBody.data = data;
    }

    if (error !== undefined && error !== null) {
        responseBody.error = error;
    }

    return res.status(status).json(responseBody);
};

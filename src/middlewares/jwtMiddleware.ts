import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export function jwtMiddleware(req: Request, res: Response, next: NextFunction): void | Response<any> {
    const token = req.headers.authorization?.split(' ')[1];
    const secretKey: string = 'default-secret-key';

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, secretKey) as { userId: string };
    } catch (error) {
        return res.status(401).json({ error: 'Token de autenticación inválido.' });
    }

    if (typeof decoded !== 'object' || !decoded.userId) {
        return res.status(401).json({ error: 'Token de autenticación inválido.' });
    }

    next();
}


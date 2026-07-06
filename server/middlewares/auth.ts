import express from "express"
import { verifyAuthToken } from "../utils/jwt.js"

// Augment Express Request with the authenticated user's Google "sub",
// which is the primary key stored in the users table.
declare global {
    namespace Express {
        interface Request {
            userToken?: string;
        }
    }
}

export function auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = header.slice("Bearer ".length);
    try {
        const payload = verifyAuthToken(token);
        req.userToken = payload.sub;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

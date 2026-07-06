import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export type AuthTokenPayload = {
    // Google "sub" — the permanent unique id for the user, stored as users.token
    sub: string;
};

export function signAuthToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as any });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
    return jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
}

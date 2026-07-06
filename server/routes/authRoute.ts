import express from "express"
import { OAuth2Client } from "google-auth-library"
import { pool } from "../db.js"
import { env } from "../config/env.js"
import { signAuthToken } from "../utils/jwt.js"
import { auth } from "../middlewares/auth.js"

export const authRoute = express.Router();

const googleClient = new OAuth2Client(env.googleClientId);

// POST /api/auth/google — verify Google ID token, upsert user, return app JWT + profile
authRoute.post("/google", async (req, res, next) => {
    try {
        const credential = req.body?.credential ?? req.body?.token;
        if (!credential || typeof credential !== "string") {
            return res.status(400).json({ message: "Missing Google credential" });
        }

        let payload;
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: env.googleClientId,
            });
            payload = ticket.getPayload();
        } catch {
            return res.status(401).json({ message: "Invalid Google credential" });
        }

        if (!payload?.sub) {
            return res.status(401).json({ message: "Invalid Google credential" });
        }

        const { sub, name, email, picture } = payload;

        await pool.query(
            `insert into users (token, name, email, picture)
             values ($1, $2, $3, $4)
             on conflict (token) do update
                set name = excluded.name,
                    email = excluded.email,
                    picture = excluded.picture`,
            [sub, name ?? null, email ?? null, picture ?? null],
        );

        const appToken = signAuthToken({ sub });
        res.json({
            token: appToken,
            user: { name: name ?? null, email: email ?? null, picture: picture ?? null },
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/auth/me — return the current user's basic profile (username display only)
authRoute.get("/me", auth, async (req, res, next) => {
    try {
        const result = await pool.query(
            `select name, email, picture from users where token = $1`,
            [req.userToken],
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: result.rows[0] });
    } catch (err) {
        next(err);
    }
});

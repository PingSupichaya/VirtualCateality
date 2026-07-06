import express from "express"
import { pool } from "../db.js"
import { auth } from "../middlewares/auth.js"

export const userRoute = express.Router();

// All routes here require a valid Google-login JWT (no anonymous users persisted).
userRoute.use(auth);

// GET /api/user/selected-cat — most recent cat_status row for the current user
userRoute.get("/selected-cat", async (req, res, next) => {
    try {
        const result = await pool.query(
            `select catid as "catId"
             from cat_status
             where token = $1
             order by updatedat desc
             limit 1`,
            [req.userToken],
        );
        if (result.rowCount === 0) {
            return res.json({ catId: null });
        }
        res.json({ catId: result.rows[0].catId });
    } catch (err) {
        next(err);
    }
});

// POST /api/user/selected-cat — body: { catId: number }
userRoute.post("/selected-cat", async (req, res, next) => {
    try {
        const catId = Number(req.body?.catId);
        if (!Number.isInteger(catId)) {
            return res.status(400).json({ message: "catId must be an integer" });
        }

        const cat = await pool.query(`select 1 from cats where catid = $1`, [catId]);
        if (cat.rowCount === 0) {
            return res.status(404).json({ message: "Cat not found" });
        }

        const existing = await pool.query(
            `select id from cat_status where token = $1 and catid = $2`,
            [req.userToken, catId],
        );

        if (existing.rowCount && existing.rowCount > 0) {
            await pool.query(
                `update cat_status set updatedat = now() where id = $1`,
                [existing.rows[0].id],
            );
        } else {
            await pool.query(
                `insert into cat_status (token, catid) values ($1, $2)`,
                [req.userToken, catId],
            );
        }

        res.json({ catId });
    } catch (err) {
        next(err);
    }
});

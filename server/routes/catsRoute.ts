import express from "express"
import { pool } from "../db.js"

export const catsRoute = express.Router();

// GET /api/cats — list all cats
catsRoute.get("/", async (req, res, next) => {
    try {
        const result = await pool.query(
            `select catid as "catId", breed, personality, cluster
             from cats
             order by catid`,
        );
        res.json({ cats: result.rows });
    } catch (err) {
        next(err);
    }
});

// GET /api/cats/:id — get a single cat
catsRoute.get("/:id", async (req, res, next) => {
    try {
        const catId = Number(req.params.id);
        if (!Number.isInteger(catId)) {
            return res.status(400).json({ message: "Invalid cat id" });
        }

        const result = await pool.query(
            `select catid as "catId", breed, personality, cluster
             from cats
             where catid = $1`,
            [catId],
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Cat not found" });
        }
        res.json({ cat: result.rows[0] });
    } catch (err) {
        next(err);
    }
});

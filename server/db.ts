import { Pool } from "pg";
import { env } from "./config/env.js";

export const pool = new Pool({
    host: env.pg.host,
    port: env.pg.port,
    user: env.pg.user,
    password: env.pg.password,
    database: env.pg.database,
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle Postgres client", err);
});

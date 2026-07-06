import "dotenv/config";

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    port: Number(process.env.PORT ?? 3000),
    clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",

    pg: {
        host: process.env.PGHOST ?? "localhost",
        port: Number(process.env.PGPORT ?? 5432),
        user: process.env.PGUSER ?? "postgres",
        password: process.env.PGPASSWORD ?? "",
        database: process.env.PGDATABASE ?? "hackthekitty",
    },

    googleClientId: required("GOOGLE_CLIENT_ID"),

    jwtSecret: required("JWT_SECRET"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
};

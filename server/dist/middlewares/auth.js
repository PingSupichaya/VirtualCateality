import { verifyAuthToken } from "../utils/jwt.js";
export function auth(req, res, next) {
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
    }
    catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
//# sourceMappingURL=auth.js.map
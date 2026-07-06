export function auth(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey == "mysecretKey") {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
//# sourceMappingURL=auth.js.map
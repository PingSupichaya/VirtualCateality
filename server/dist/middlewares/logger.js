export function logger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
}
//# sourceMappingURL=logger.js.map
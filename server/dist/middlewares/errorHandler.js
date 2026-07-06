import { getErrorMessage } from "../utils.js";
export default function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        next(error);
        return;
    }
    res.status(500).json({
        error: {
            message: getErrorMessage(error)
        }
    });
    next(error);
}
//# sourceMappingURL=errorHandler.js.map
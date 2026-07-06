import "source-map-support/register";
import express from "express";
import { taskRouter } from "./routes/tasks.js";
// import { logger } from "./middlewares/logger.js";
import cors from "cors";
import morgan from "morgan";
import errorHandler from './middlewares/errorHandler.js';
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger)
app.get("/", (req, res) => {
    res.status(404).send("Not found");
});
app.use("/tasks", taskRouter);
app.use(errorHandler);
app.listen(3000, () => {
    console.log(`Express is running on 3000`);
});
//# sourceMappingURL=server.js.map
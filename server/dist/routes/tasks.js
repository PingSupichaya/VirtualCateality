import express from "express";
import { auth } from "../middlewares/auth.js";
export const taskRouter = express.Router();
taskRouter.get("/", (req, res) => {
    res.json({ tasks: [{ id: 1, title: "Task 1", completed: false }] });
});
taskRouter.get("/", (req, res) => {
    const search = req.query.search;
    if (search) {
        return res.json({ tasks: [{ id: 1, title: `${search}`, completed: false }], });
    }
    res.json({ tasks: [{ id: 1, title: "Task 1", completed: false },
            { id: 2, title: "Task 2", completed: false }
        ], });
});
taskRouter.get("/:id", (req, res) => {
    throw new Error("something went wrong");
    const taskId = req.params.id;
    res.json({ tasks: [{ id: taskId, title: `Task ${taskId}`, completed: false }] });
});
taskRouter.post("/", auth, (req, res) => {
    const title = req.body.title;
    const completed = req.body.completed;
    res.json({ tasks: { title, completed } });
});
//# sourceMappingURL=tasks.js.map
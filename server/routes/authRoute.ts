import express from "express"
import { auth } from "../middlewares/auth.js"

export const authRoute = express.Router();

authRoute.get("/", (req, res) => {
    res.json({ tasks: [{id: 1, title: "Task 1", completed: false}]})
})

authRoute.get("/", (req, res) => {
    const search = req.query.search as string | undefined
    if(search){
        return res.json({ tasks: [{id: 1, title: `${search}`, completed: false}],})
    }
    res.json({ tasks: [{id: 1, title: "Task 1", completed: false},
                       {id: 2, title: "Task 2", completed: false}
    ],})
})

authRoute.get("/:id", (req, res) => {
    throw new Error("something went wrong")
    const taskId = req.params.id
    res.json({ tasks: [{id: taskId, title: `Task ${taskId}`, completed: false}]})
})

authRoute.post("/", auth, (req, res) => {
    const title = req.body.title
    const completed = req.body.completed
    res.json({ tasks: { title, completed }})
})
import "source-map-support/register.js"
import express from "express";
import cors from "cors"
import morgan from "morgan"
import { env } from "./config/env.js"
import { authRoute } from "./routes/authRoute.js"
import { catsRoute } from "./routes/catsRoute.js"
import { quizRoute } from "./routes/quizRoute.js"
import { userRoute } from "./routes/userRoute.js"
import errorHandler from './middlewares/errorHandler.js'

const app = express();

app.use(cors({ origin: env.clientOrigin }))
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.status(404).send("Not found")
})

app.use("/api/auth", authRoute)
app.use("/api/cats", catsRoute)
app.use("/api/quiz", quizRoute)
app.use("/api/user", userRoute)

app.use(errorHandler)

app.listen(env.port, () => {
    console.log(`Express is running on ${env.port}`)
})

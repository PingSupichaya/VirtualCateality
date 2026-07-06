import "source-map-support/register"
import express from "express";
import { authRoute } from "./routes/authRoute.js"
// import { logger } from "./middlewares/logger.js";
import cors from "cors"
import morgan from "morgan"
import errorHandler from './middlewares/errorHandler.js'

const { Client } = require("pg")
const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Ashuya0312-",
    database: "hackthekitty"
})
const app = express();

app.use(cors())
app.use(morgan("tiny"))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// app.use(logger)

app.get("/", (req, res) => {
    res.status(404).send("Not found")
})

app.use("/login", authRoute)

app.use(errorHandler)

app.listen(3000, () => {
    console.log(`Express is running on 3000`)
})


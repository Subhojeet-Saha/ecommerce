import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectdb from "./config/db.js";
import authroute from "./routes/authroute.js";
import cors from 'cors';
import categoryroutes from './routes/categoryroutes.js'
import productroutes from './routes/productroutes.js'

// configure env
dotenv.config()

// database config
connectdb()

// rest object
const app = express()

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authroute);
app.use("/api/v1/category",categoryroutes);
app.use("/api/v1/product",productroutes);


// rest api
app.get('/', (req, res) => {
    res.send("<h1>welcome to ecommerce app </h1>")
})

// port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} or ${PORT}`.bgCyan.white);
})
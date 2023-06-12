import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"


dotenv.config()

const app=express()

connectDB();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// routes
app.use('/api/v1/auth',authRoutes);

app.get("/",function(req,res){
    res.send("hiii")
})

const PORT=process.env.PORT || 3030

app.listen( PORT ,function(){
    console.log(`Server started ${PORT}`.bgCyan.white)
})
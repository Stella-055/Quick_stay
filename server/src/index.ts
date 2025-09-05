import  type { Request,Response } from "express"
import express from "express"
import cors from "cors"
import { dbConnect } from "./utils/db.js"
dbConnect()
const app = express()
app .use (express.json())
app .use (cors(
    {origin:["http://localhost:3000","https://qshotel.netlify.app/"],
        credentials: true,
    }
))
app.get("/", (req:Request,res:Response)=>{
    res.send("welcome to quick stay")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`serer is upand running on port ${PORT}`)
})

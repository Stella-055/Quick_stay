import  type { Request,Response } from "express"
import express from "express"
const app = express()
 
app.get("/", (req:Request,res:Response)=>{
    res.send("welcome to quick stay")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`serer is upand running on port ${PORT}`)
})
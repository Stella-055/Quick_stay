import mongoose  from "mongoose";
export const dbConnect = async ()=>{
    try {
        mongoose.connection.on("connected",()=>console.log("database connected"))
        await mongoose.connect(process.env.MONGOBD_URI!); 
    } catch (error) {
       console.log(error) 
    }
   
}
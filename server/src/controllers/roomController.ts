import type { Request, Response } from "express";
import Hotel from "../models/Hotel";
import Room from "../models/Room";
import { v2 as cloudinary } from 'cloudinary'

export const createRoom = async(req: Request,res:Response)=>{
    try {
        const {roomType,pricePerNight, ammenities ,userId }=req.body
        const hotel =await Hotel.findOne({owner:userId})
        if(!hotel){
            return res.status(400).json({message:"Hotel does not exists"})
        }

        const files=  req.files as Express.Multer.File[]
        const upload = files.map( async(file )=>{
             const response = await cloudinary.uploader .upload(file.path)
                return response.secure_url
            
        })
        const images = await Promise.all(upload)
        const room = await Room.create({
            hotel:hotel._id,
            roomType,
            pricePerNight :Number(pricePerNight),
            ammenities,
            images,
            isAvailable:true
        })
        res.status(200).json({message:"room created successfully",room})
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }

}

export const getAllRooms = async(req: Request,res:Response)=>{
    try {
        const rooms = await Room.find({isAvailable:true}).populate({path:"hotel",populate:{path:"owner",select:"image"}})
        res.status(200).json({message:"all rooms",rooms})
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
}

export const getOwnerRooms = async(req: Request,res:Response)=>     {
    try {
        const hotelData = await Hotel.findOne({owner:req.body.userId})
        const rooms = await Room.find({hotel:hotelData?._id.toString()}).populate("hotel")
        res.status(200).json({message:"all rooms",rooms})
    } catch (error) {
        res.status(500).json({ message: "internal server error" }); 
    }
}
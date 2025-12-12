import type { Request, Response } from "express";
import Hotel from "../models/Hotel";
import Room from "../models/Room";
import { v2 as cloudinary } from "cloudinary";

export const createRoom = async (req: Request, res: Response) => {
  try {

    const {  userId } = req.body;
    
    const {roomType, pricePerNight, ammenities,}=req.body.room
    const hotel = await Hotel.findOne({ owner: userId });
    if (!hotel) {
      return res.status(400).json({ message: "Hotel does not exists" });
    }

    const files = req.files as Express.Multer.File[];
    const upload = files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    const images = await Promise.all(upload);
    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      ammenities,
      images,
      isAvailable: true,
    });
    res.status(200).json({ message: "room created successfully", room });
  } catch (error) {
    console.error(" Create room error:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate({
      path: "hotel",
      populate: { path: "owner", select: "image" },
    });
 
    res.status(200).json({ message: "all rooms", rooms });
  } catch (error) {
    console.error("Get all rooms error:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getOwnerRooms = async (req: Request, res: Response) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.body.userId });
    const rooms = await Room.find({
      hotel: hotelData?._id.toString(),
    }).populate("hotel");
    res.status(200).json({ message: "all rooms", rooms });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const toggleRoomAvailability = async (req: Request, res: Response) => {
  interface User {
    _id: string;
    image: string;
  }

  interface Hotel {
    _id: string;
    owner: User; // after populate
  }

  interface Room {
    _id: string;
    hotel: Hotel;
  }
  try {
    const { roomId } = req.params;
    const { userId } = req.body;

    const room = await Room.findById(roomId).populate<{ hotel: Hotel }>({
      path: "hotel",
      populate: { path: "owner", select: "_id" },
    });
    if (!room) {
      return res.status(400).json({ message: "room does not exists" });
    }
    if (room!.hotel!.owner!._id.toString() !== userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    room.isAvailable = !room.isAvailable;
    await room.save();
    res.status(200).json({ message: "room availability updated", room });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

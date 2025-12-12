import Hotel from "../models/Hotel";
import User from "../models/User";
import { Request, Response } from "express";
export const registerHotel = async (req: Request, res: Response) => {
  try {
    const { name, address, contact, city, userId } = req.body;
    const owner = userId;
    const hotel = await Hotel.findOne({userId});

    if (hotel) {
      return res.status(400).json({ message: "Hotel already exists" });
    }
    await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: "hotelowner" });
    res.status(200).json({ message: "hotel registered successfully" });
  } catch (error) {
    console.error(" Hotel registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { Request, Response } from "express";
import Booking from "../models/Booking";

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;
   if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "room, checkInDate and checkOutDate are required" });
    }
    const overlappingBookings = await Booking.find({
      room: roomId,
      $or: [
        {
          checkInDate: { $lte: new Date(checkOutDate) },
          checkOutDate: { $gte: new Date(checkInDate) },
        },
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(200).json({ available: false, message: "Room is not available for the selected dates." });
    }

    res.status(200).json({ available: true, message: "Room is available for the selected dates." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
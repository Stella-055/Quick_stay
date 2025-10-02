import { Request, Response } from "express";
import Booking from "../models/Booking";



const checkAvailability= async (roomId: string, checkInDate: Date, checkOutDate: Date) => {
  const overlappingBookings = await Booking.find({
    room: roomId,
    $or: [
      {
        checkInDate: { $lte: checkOutDate },
        checkOutDate: { $gte: checkInDate },
      },
    ]
  });
  return overlappingBookings.length === 0;
}

export const checkAvailabilityApi = async (req: Request, res: Response) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;
   if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "room, checkInDate and checkOutDate are required" });
    }
   
   const overlappingBookings = await checkAvailability(roomId, new Date(checkInDate), new Date(checkOutDate));
    if (!overlappingBookings ) {
      return res.status(400).json({ available: false, message: "Room is not available for the selected dates." });
    }

    res.status(200).json({ available: true, message: "Room is available for the selected dates." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, roomId, hotelId, checkInDate, checkOutDate, totalPrice, numberOfGuests } = req.body;
    if (!userId || !roomId || !hotelId || !checkInDate || !checkOutDate || !totalPrice || !numberOfGuests) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const overlappingBookings = await checkAvailability(roomId, new Date(checkInDate), new Date(checkOutDate));
    if (!overlappingBookings) {
      return res.status(400).json({ available: false, message: "Room is not available for the selected dates." });
    }
  
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn >= checkOut) {
      return res.status(400).json({ message: "Check-out date must be after check-in date" });
    }

    const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
   const  total = totalPrice *numberOfNights ;
    const newBooking = new Booking({
      user: userId,
      room: roomId,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      totalPrice:total,
      numberOfGuests
    });
    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
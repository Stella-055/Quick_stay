import { Request, Response } from "express";
import Booking from "../models/Booking";
import Room from "../models/Room";
import Hotel from "../models/Hotel";
import User from "../models/User";
import { transporter } from "../utils/Nodemailer";
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
    const { userId, roomId, checkInDate, checkOutDate, numberOfGuests } = req.body;
    if (!userId || !roomId || !checkInDate || !checkOutDate || !numberOfGuests) {
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
const room = await Room.findOne({ _id: roomId });
    const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalPrice = room!.pricePerNight
   const  total = totalPrice*numberOfNights ;
    const newBooking = new Booking({
      user: userId,
      room: roomId,
      hotel: room?.hotel,
      checkInDate,
      checkOutDate,
      totalPrice:total,
      numberOfGuests
    });
    await newBooking.save();
    const user= await User.findById(userId);
    await transporter.sendMail({
      from: '"Quick stay hotel booking" <' + process.env.SENDER_EMAIL + '>', 
      to: user?.email,
      subject: "Room Booking ✔",
      text: "Your booking is confirmed!",
      html:`<h1>Booking Confirmation</h1>
      <p>Dear ${user?.username},</p>
      <p>Thank you for booking with Quick Stay Hotel. Your booking has been confirmed.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li> <strong>Room :</strong>  ${room?._id} ${room?.roomType}</li>
        <li> <strong> Check-In Date: </strong> ${new Date(checkInDate).toDateString()}</li>
        <li> <strong> Check-Out Date: </strong> ${new Date(checkOutDate).toDateString()}</li>
        <li> <strong> Number of Guests:  </strong> ${numberOfGuests}</li>
        <li> <strong> Total Price:  </strong> $${total}</li>
      </ul>
      <p>We look forward to hosting you!</p>
      <p>Best regards,<br/>Quick Stay Hotel Team</p>`, 
    });
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId }).populate('room').populate('hotel');
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getHotelBookings = async (req: Request, res: Response) => {
  try {
    const hotel= await Hotel.findOne({owner:req.body.userId});
    if(!hotel){
      return res.status(404).json({ message: "Hotel not found for this owner" });
    }
    const bookings = await Booking.find({ hotel: hotel._id }).populate('room').populate('user');
    const totalBookings= bookings.length;
   
    res.status(200).json({ bookings });
 
   const totalRevenue= bookings.reduce((sum, booking) => sum + booking.totalPrice!, 0);

   res.status(200).json({ bookings, totalBookings, totalRevenue });
   console.log(`Total Bookings: ${totalBookings}, Total Revenue: ${totalRevenue}`);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
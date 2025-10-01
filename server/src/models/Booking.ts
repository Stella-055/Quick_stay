import mongoose from "mongoose";

const bookingShema = new mongoose.Schema(
  {
    user: { type: String, require:true , ref:"user" },
    room: { type: String, require:true , ref:"room" },
    hotel: { type: String, require:true , ref:"hotel" },
    checkInDate: { type: Date, require:true },
    checkOutDate: { type: Date, require:true },
    totalPrice: { type: Number, require:true  },
    numberOfGuests: { type: Number, require:true  },
    status: { type: String, enum :["pending","booked", "cancelled"], default:"pending" },
    isPaid: { type: Boolean, default:false },
    paymentMethod: { type: String, default:"pay at the Hotel" },
  },
  { timestamps: true },
);

const Booking = mongoose.model("booking", bookingShema);
export default Booking;

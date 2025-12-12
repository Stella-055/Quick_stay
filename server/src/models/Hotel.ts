import mongoose from "mongoose";

const hotelShema = new mongoose.Schema(
  {
  
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, require: true },
    city: { type: String, require: true },
    owner: { type: String, require: true, ref: "User" },
  },
  { timestamps: true },
);

const Hotel = mongoose.model("hotel", hotelShema);
export default Hotel;

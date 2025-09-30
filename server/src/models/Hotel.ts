import mongoose from "mongoose";

const hotelShema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
  contact: { type: String, require:true },
    city: { type: String, require:true },
    owner: { type: String, require:true , ref:"user" },
  },
  { timestamps: true },
);

const Hotel = mongoose.model("hotel", hotelShema);
export default Hotel;

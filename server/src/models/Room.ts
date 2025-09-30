import mongoose from "mongoose";


const roomShema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    hotel: { type: String, require:true , ref:"hotel" },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    ammenities: { type: Array, required: true },
    images: [{ type: String}],
    isAvailable: { type: Boolean, require:true },
  
   
  },
  { timestamps: true },
);

const Room = mongoose.model("room", roomShema);
export default Room;

import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("database connected"),
    );

    await mongoose.connect(`${process.env.MONGODB_URI!}/quickstay`);
  } catch (error) {
    console.log(error);
  }
};

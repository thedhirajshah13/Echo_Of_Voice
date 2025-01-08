import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/MERN_BLOG");
    console.log("database connected succesfully");
  } catch (error) {
    console.log("error while connecting database", error);
  }
};

export default connection;

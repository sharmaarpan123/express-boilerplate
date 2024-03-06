import mongoose from "mongoose";

const mongoInit = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017");

    console.log(" connecting to mongodb");
  } catch (error) {
    console.log("error while connecting to mongodb");
  }
};

export default mongoInit;

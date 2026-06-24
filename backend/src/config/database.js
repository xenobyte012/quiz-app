import mongoose from "mongoose";

const connetDB = async () => {
  try {
    console.log("Attempting connection...");
    console.log(process.env.MONGODB_URL);

    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL
    );

    console.log("Connected!");
    console.log(connectionInstance.connection.host);

  } catch (error) {
    console.log("MongoDB connection failed:");
    console.log(error);
    process.exit(1);
  }
};

export default connetDB;
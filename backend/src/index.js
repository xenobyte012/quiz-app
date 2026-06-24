import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config({
  path: "./.env",
});


const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(process.env.PORT || 5090, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!!", error);
  }
};

startServer();

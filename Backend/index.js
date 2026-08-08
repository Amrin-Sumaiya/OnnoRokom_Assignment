import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./connectdb.js";
import teacherRoutes from "./Routes/teacherroute.js";


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);
// Start server and connect DB
app.listen(PORT, async () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
  try {
    await connectDB(MONGO_URL);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});


app.use("/api", teacherRoutes);

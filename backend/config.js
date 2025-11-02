// config.js
import mongoose from "mongoose";
import 'dotenv/config';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4ox5lnd.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`;

mongoose.connect(url)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default mongoose.connection; // 👈 sirf connection export karo

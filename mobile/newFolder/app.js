import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import AttendenceRoutes from "./routes/attendenceRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import cors from "cors";
import contactRoutes from "./routes/contactRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import tfcRoute from "./routes/tfcRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();
// something

//rest object
const app = express();
app.use(express.json());
app.use(cors());
// //routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/tfc", tfcRoute);
app.use("/attendence", AttendenceRoutes);
//PORT
app.use("/api", contactRoutes);

app.use(
  express.static(path.join(fileURLToPath(import.meta.url), "./dharma/build"))
);
//Static files serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./dharma/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dharma/build/index.html"));
});

//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});

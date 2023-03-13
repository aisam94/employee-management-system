import express from "express";
import path, { dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;
const corsOption = {
  // origin: process.env.CLIENT_URL,
  origin: '*',
}
app.use(cors(corsOption));
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/roles", rolesRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


app.get("/", cors(corsOption), (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Origin', '*');
  res.send("API is running ...");
});

app.listen(port, () => {
  //perform database connection when server starts
  connectDB();
  console.log(`Server is running on port: ${port}`);
});

import express from "express";
import https from 'https';
import fs from 'fs';
import path from "path";
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
  origin: process.env.CLIENT_URL,
}
app.use(cors(corsOption));
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/roles", rolesRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.send("API is running ...");
});

const options = {
  key: fs.readFileSync(process.env.KEY_DIR),
  cert: fs.readFileSync(process.env.CERT_DIR),
}

https.createServer(options, app).listen(port, () => {
  //perform database connection when server starts
  connectDB();
  console.log(`Server is running on port: ${port}`);
});

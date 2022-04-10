import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/department", departmentRoutes);

app.listen(port, () => {
  //perform database connection when server starts
  connectDB();
  console.log(`Server is running on port: ${port}`);
});

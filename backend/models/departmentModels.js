import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  name: String,
  description: String,
  company: String,
  contact: Number,
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;

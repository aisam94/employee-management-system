import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;

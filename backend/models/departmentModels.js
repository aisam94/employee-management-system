import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  DepartmentName: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;

import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employeeId: {
      type: Number,
      required: true,
    },
    company: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Company",
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Department",
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

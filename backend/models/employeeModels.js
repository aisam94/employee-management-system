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
      // type: [mongoose.Schema.Types.ObjectId],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

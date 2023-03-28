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
    email: {
      type: String,
      required: true,
    },
    company: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Company",
      type: String,
      required: true,
    },
    role: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Role",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    age: Number,
    pictureUrl: String,
    address: String,
    phone: Number,
    emergencyContactName: String,
    emergencyContactPhone: Number,
    startDate: {
      type: Date,
      default: Date.now
    },
    terminationDate: Date,
    employmentStatus: {
      type: String,
      enum: ['full-time', 'part-time', 'contract']
    },
    salary: Number,
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

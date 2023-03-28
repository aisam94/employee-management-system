import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  name: String,
  company: String,
  description: String,
  salary: String,
  qualifications: [String],
  skills: [String],
},
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;

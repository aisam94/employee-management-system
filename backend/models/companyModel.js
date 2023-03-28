import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: Number,
    website: String,
    description: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;

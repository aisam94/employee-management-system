import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Company",
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others']
    },
    lastLoginDate: Date,
    lastPasswordResetDate: Date,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

userSchema.methods.isMatchingPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;

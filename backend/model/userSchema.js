import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Provide Your Full Name"],
    },
    email: {
      type: String,
      required: [true, "Please Provide Your Email"],
      validate: [validator.isEmail, "Please Enter A Valid Email"],
    },
    phone: {
      type: String,
      required: [true, "Please Provide Your Phone Number."],
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);

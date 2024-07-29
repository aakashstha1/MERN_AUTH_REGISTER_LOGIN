import { User } from "../model/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

//AUTHENTICATION
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User not authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

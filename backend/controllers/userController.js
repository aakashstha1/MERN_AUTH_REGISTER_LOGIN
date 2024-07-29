import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../model/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return next(new ErrorHandler("Please Privide All Details.", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email Already Exists.", 400));
  }

  user = await User.create({
    fullName,
    email,
    phone,
    password,
  });

  sendToken(user, 200, "User Registered Successfully", res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Provide All Details.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 200, "User Logged In Successfully", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

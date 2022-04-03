import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import Company from "../models/companyModel.js";
import generateToken from "../utils/generateToken.js";

//@description  Auth user and get token
//@router       POST /api/users/login
//@access       Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.isMatchingPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Wrong email or password.");
  }
});

//@description  Register new user
//@router       POST /api/users
//@access       Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, companyName } = req.body;

  //check if user exists
  //maybe check if company already exist also
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist.");
  }

  const company = await Company.create({
    name: companyName,
  });

  const user = await User.create({
    name,
    email,
    password,
    company,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//@description  Get user profiles
//@router       GET /api/users/profiles
//@access       Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//@description  Update user profile
//@router       PUT /api/users/profile
//@access       Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//@description  Delete user
//@router       DELETE /api/users/
//@access       Private

const deleteUser = asyncHandler(async (req, res) => {
  //should iterate over employees and delete all also

  await User.deleteOne({ _id: req.user._id });
  return res.json({
    message: "User has been deleted.",
  });
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// user login
const loginUser = async (req, res) => {};

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.json({ message: "User already exists" });

    // Validating user email & password
    if (!validator.isEmail(email)) {
      return res.json({ message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ message: "Password must be at least 8 characters" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);
    return res.status(201).json({
      statusCode: 201,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser };

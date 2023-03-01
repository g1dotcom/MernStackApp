import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userSchema from "../models/users.js";

const router = express.Router();

// http://localhost:5000/users/signup //

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, email, password, correctionPassword, phoneNumber } =
      req.body;

    if (password !== correctionPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const userExists = await userSchema.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userSchema.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return res.json({ message: "create user failed" });
  }
};

// http://localhost:5000/users/signin //

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong Password" });

    return res.status(200).json({ user, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Login Failed" });
  }
};

export default router;

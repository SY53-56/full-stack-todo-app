const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const routes = express.Router();

// Signup
routes.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Data is empty" });

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "You have already signed up" });

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await User.create({ username, email, password: hashPassword });

    const token = jwt.sign({ id: data._id, username: data.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
     secure:true,
      sameSite: "lax",
    });

    res.status(201).json({ message: "Signup successful",user: {
        id: data._id,
        username: data.username,
        email: data.email,
      }, });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Fill the data" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "password mismatch" });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", });

    res.status(200).json({ message: "Login successful", user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }, });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
routes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

module.exports = routes;

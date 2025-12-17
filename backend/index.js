require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ Database connected"))
.catch(err => console.error("❌ MongoDB connection error sahul:", err));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.get("/sahul", (req, res) => {
  console.log("TOKEN:", req.cookies?.token);
  console.log("JWT_SECRET is:", process.env.JWT_SECRET);
  res.send("Backend working ✅");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

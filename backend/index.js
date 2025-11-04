const express = require("express");
const mongoose = require("mongoose");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/UserRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require('dotenv').config();

app.use(
  cors({
    origin: process.env.CLIENT_URL ,
    credentials: true,
  })
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("✅ Database connected sahul"));

// Middleware
app.use(express.json());
app.use(cookieParser()); // ✅ Correct usage

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.get("/sahul", (req, res) => {
     console.log("TOKEN:", req.cookies?.token);
  console.log("JWT_SECRET is:", process.env.JWT_SECRET);
  res.send("sahul");
});
app.get("/test-cookie", (req, res) => {
  console.log(req.cookies.token); // should print the token
  res.send("Check console");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

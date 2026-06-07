const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const {connectDB} = require("./config/db.js");
const {healthRoutes} = require("./routes/healthRoutes.js");
const {taskRoutes} = require("./routes/taskRoutes.js");
const {authRoutes} = require("./routes/authRoutes.js");

const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
});

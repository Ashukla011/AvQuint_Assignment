const express = require("express");

const healthRoutes = express.Router();

healthRoutes.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = {healthRoutes};
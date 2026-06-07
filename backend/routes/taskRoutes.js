const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateStatus,
} = require("../controllers/taskController");

const validate = require("../middleware/validate");

const {
  createTaskValidator,
} = require("../validators/taskValidator");

router.use(protect);

router.post(
  "/",
  createTaskValidator,
  validate,
  createTask
);

router.get("/", getTasks);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", updateStatus);

module.exports = {taskRoutes: router};
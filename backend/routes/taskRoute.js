const express = require('express');
const router = express.Router();
const {getTasks, newTask, deleteTask, updateTask} = require("../controllers/taskController");
const authenticate = require('../auth/auth');

router.get("/", authenticate, getTasks);

router.post("/new", authenticate, newTask);

router.delete("/:id", authenticate, deleteTask);

router.patch("/:id", authenticate, updateTask);

module.exports = router;

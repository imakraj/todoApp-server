const express = require('express');
const { getUser, register, login, logout } = require("../controllers/userController");
const authenticate = require("../auth/auth");

const router = express.Router();

router.get("/user", authenticate, getUser);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;


const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

secretKey = "123";

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findOne({ _id: userId });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({ message: 'User already exists' });
        }

        async function hashPassword(password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        }

        const user = new User({
            name,
            email,
            password: await hashPassword(password)
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

        const expirationTime = new Date(Date.now() + 3600000);

        res.cookie('token', token, { httpOnly: true, sameSite: "none", expires: expirationTime });

        user.save();
        res.status(201).json({ message: 'Registration successful', user });
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log(isPasswordValid);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

        const expirationTime = new Date(Date.now() + 3600000);

        res.cookie('token', token, { httpOnly: true, sameSite: "none", expires: expirationTime });
        res.status(201).json({ message: 'Login successful', user });
        console.log("from login " + req.cookies.token);
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const logout = async (req, res) => {
    res.clearCookie("token", { path: '/', domain: 'localhost' });
    res.json({ message: 'Logout successful' });
};

module.exports = {
    getUser,
    register,
    login,
    logout
}
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  console.log("Register API Hit");
  console.log(req.body);
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const responseUser = {
    _id: user._id,
    name: user.name,
    email: user.email
};

res.status(201).json({
    message: "User Registered Successfully",
    user: responseUser
});

    } catch (error) {
        console.log("REGISTER ERROR:")
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
           { id: user._id },
           "mysecretkey",
           { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
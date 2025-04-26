import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or phone already exists" });
        }

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            data: {
                id: newUser._id,
                name,
                email,
                phone,
                token: generateToken(newUser._id)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            success: true,
            data: { id: user._id, name: user.name, email, token: generateToken(user._id) }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

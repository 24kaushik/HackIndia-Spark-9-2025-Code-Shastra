import asyncHandler from 'express-async-handler';
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

export const validateToken = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        return res.json({
            success: true,
            message: "Token is valid",
            user: await User.findById(decoded.id).select('name role email profileImg')
            
        });
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});

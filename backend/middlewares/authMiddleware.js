import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import "dotenv/config";

// Middleware to verify user authentication
export const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).json({ error: "Not authorized, invalid token" });
        }
    } else {
        res.status(401).json({ error: "Not authorized, no token" });
    }
};

// Middleware to restrict access based on roles
// export const authorize = (...allowedRoles) => {
//     return (req, res, next) => {
//         if (!req.user || !allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Access forbidden: You do not have permission" });
//         }
//         next();
//     };
// };


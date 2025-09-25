import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("JWT ")) {
      return res.status(401).json({ message: "No token provided or wrong format" });
    }

    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.id = decoded.id; // attach decoded payload (like userId, email)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

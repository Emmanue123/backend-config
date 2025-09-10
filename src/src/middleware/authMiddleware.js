const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to request (without password)
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;

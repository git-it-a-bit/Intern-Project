import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // 3. Check if user is active
    if (user.status === "inactive") {
      return next(createError(403, "User account is inactive"));
    }

    // 4. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(401, "Invalid credentials"));
    }
    console.log("inside login");
    // 5. Create JWT payload
    const payload = {
      id: user._id,
      role: user.role,
    };

    // 6. Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 7. Send response
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};

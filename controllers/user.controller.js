import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "user deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    console.log(user); //
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    if (!data) {
      return res.status(400).send("Something went wrong");
    }
    res.status(200).send({ count: data.length, info: data });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return next(createError(400, "All fields are required"));
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "User already exists with this email"));
    }

    // 3. Restrict role assignment (only admin can assign roles)

    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role,
      status: "active",
    });

    // 6. Remove password from response
    const { password: pwd, ...userData } = newUser._doc;

    res.status(201).json({
      message: "User created successfully",
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // 1. Find user
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // 2. Build allowed updates (whitelisting)
    const allowedFields = ["name", "email", "password", "role", "status"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // 6. Check duplicate email (if updating email)
    if (updates.email) {
      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return next(createError(409, "Email already in use"));
      }
    }

    // 7. Hash password if being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // 8. Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true },
    );

    // 9. Remove password from response
    const { password, ...userData } = updatedUser._doc;

    res.status(200).json({
      message: "User updated successfully",
      user: userData,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(createError(409, "Email already exists"));
    }
    next(err);
  }
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["viewer", "analyst", "admin"],
    default: "viewer",
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.model("User", userSchema);

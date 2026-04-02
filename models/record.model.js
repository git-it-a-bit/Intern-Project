import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
      index: true, // Optimized for filtering
    },
    date: {
      type: Date,
      default: Date.now,
      index: true, // Optimized for date-range queries
    },
    desc: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexing for combined filtering (e.g., specific category within a date range)
recordSchema.index({ type: 1, category: 1, date: -1 });

export default mongoose.model("Record", recordSchema);

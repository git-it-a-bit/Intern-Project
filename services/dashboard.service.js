import Record from "../models/record.model.js";
import mongoose from "mongoose";

export const getDashboardSummary = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // 1. Total Income & Expense
  const totals = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  totals.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  // 2. Net Balance
  const netBalance = totalIncome - totalExpense;

  // 3. Category-wise totals
  const categoryTotals = await Record.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
  ]);

  // 4. Recent Activity (last 5)
  const recent = await Record.find().sort({ createdAt: -1 }).limit(5);

  // 5. Monthly Trends
  const monthly = await Record.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryTotals,
    recent,
    monthly,
  };
};

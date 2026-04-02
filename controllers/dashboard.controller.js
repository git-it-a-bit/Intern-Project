import * as dashboardService from "../services/dashboard.service.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await dashboardService.getDashboardSummary(userId);

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

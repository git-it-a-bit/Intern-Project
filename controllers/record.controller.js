import Record from "../models/record.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createError from "../utils/createError.js";

export const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return next(createError(404, "Record Not Found"));
    }
    await Record.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "record deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return next(createError(404, "Record Not Found"));
    }
    res.status(200).json(record);
  } catch (err) {
    next(err);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    const { category, type, startDate, endDate, amount } = req.query;

    const filter = {};

    // Category filter
    if (amount) {
      filter.amount = amount;
    }
    if (category) {
      filter.category = { $in: category.split(",") };
    }

    // Type filter
    if (type) {
      filter.type = { $in: type.split(",") };
    }

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const data = await Record.find(filter).sort({ date: -1 });
    if (!data) {
      return next(createError(500, "Something Went Wrong"));
    }
    res.status(200).send({ count: data.length, info: data });
  } catch (err) {
    next(err);
  }
};

export const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, description } = req.body;

    // 1. Validate required fields
    if (amount === undefined || !type || !category) {
      return next(createError(400, "Amount, type and category are required"));
    }

    // 2. Validate type explicitly (extra safety)
    if (!["income", "expense"].includes(type)) {
      return next(createError(400, "Type must be 'income' or 'expense'"));
    }

    const newRecord = await Record.create({
      amount,
      type,
      category,
      date,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Record created successfully",
      record: newRecord,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const recordId = req.params.id;

    const record = await Record.findById(recordId);
    if (!record) {
      return next(createError(404, "Record not found"));
    }

    // 3. Ownership / role check
    if (record.createdBy.toString() !== req.user.id) {
      return next(
        createError(
          403,
          "Not allowed to update this record as not creatd by you",
        ),
      );
    }

    // 4. Allowed fields (whitelist)
    const allowedFields = ["amount", "type", "category", "date", "description"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // 5. Optional: validate type explicitly
    if (updates.type && !["income", "expense"].includes(updates.type)) {
      return next(createError(400, "Type must be 'income' or 'expense'"));
    }

    // 6. Update record
    const updatedRecord = await Record.findByIdAndUpdate(
      recordId,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (err) {
    next(err);
  }
};

import Transaction from "../models/transactionModel.js";

// 📌 Get all transactions for a user with filters + pagination
export const getTransactionsService = async (userId, filters) => {
  try {
    const { type, category, date, page, limit } = filters;

    // 🔎 Build query
    const query = { userId };

    if (type && type !== "all") {
      query.type = type; // income or expense
    }

    if (category && category.trim() !== "") {
      // Case-insensitive regex search
      query.category = { $regex: category, $options: "i" };
    }

    if (date) {
      // Match transactions on same day
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(query);

    return {
      status: 200,
      message: "Transactions fetched successfully",
      data: {
        transactions,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};


// 📌 Add transaction
export const addTransactionService = async (userId, txData) => {
  try {
    const { date, category, type, amount, paymentMode, description } = txData;

    if (!category || !type || !amount) {
      return { status: 400, message: "Missing required fields" };
    }

    const newTransaction = new Transaction({
      userId,
      date,
      category,
      type,
      amount,
      paymentMode,
      description,
    });

    const savedTransaction = await newTransaction.save();
    return { status: 201, message: "Transaction added successfully", data: savedTransaction };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

// 📌 Update transaction
export const updateTransactionService = async (userId, id, txData) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId }, // ensures only user's own transaction can be updated
      txData,
      { new: true }
    );

    if (!updatedTransaction) {
      return { status: 404, message: "Transaction not found" };
    }

    return { status: 200, message: "Transaction updated successfully", data: updatedTransaction };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

// 📌 Delete transaction
export const deleteTransactionService = async (userId, id) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!deletedTransaction) {
      return { status: 404, message: "Transaction not found" };
    }

    return { status: 200, message: "Transaction deleted successfully" };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

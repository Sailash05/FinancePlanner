import { response } from "../utils/response.js";
import {
  getTransactionsService,
  addTransactionService,
  updateTransactionService,
  deleteTransactionService,
} from "../service/transactionService.js";

// 📌 Get all transactions for a user with filters + pagination
export const getTransaction = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT middleware

    // Filters from query params
    const { type, category, date, page = 1, limit = 10 } = req.query;

    const result = await getTransactionsService(userId, {
      type,
      category,
      date,
      page: Number(page),
      limit: Number(limit),
    });

    if (result.status === 200) {
      return res
        .status(200)
        .send(response("SUCCESS", result.message, result.data));
    } else {
      return res
        .status(result.status)
        .send(response("FAILED", result.message, null));
    }
  } catch (err) {
    return res.status(500).send(response("FAILED", err.message, null));
  }
};


// 📌 Add new transaction
export const addTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await addTransactionService(userId, req.body);

    if (result.status === 201) {
      return res.status(201).send(response("SUCCESS", result.message, result.data));
    } else {
      return res.status(result.status).send(response("FAILED", result.message, null));
    }
  } catch (err) {
    return res.status(500).send(response("FAILED", err.message, null));
  }
};

// 📌 Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await updateTransactionService(userId, id, req.body);

    if (result.status === 200) {
      return res.status(200).send(response("SUCCESS", result.message, result.data));
    } else {
      return res.status(result.status).send(response("FAILED", result.message, null));
    }
  } catch (err) {
    return res.status(500).send(response("FAILED", err.message, null));
  }
};

// 📌 Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await deleteTransactionService(userId, id);

    if (result.status === 200) {
      return res.status(200).send(response("SUCCESS", result.message, null));
    } else {
      return res.status(result.status).send(response("FAILED", result.message, null));
    }
  } catch (err) {
    return res.status(500).send(response("FAILED", err.message, null));
  }
};

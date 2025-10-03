import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now }, // transaction date
    category: { type: String, required: true }, // e.g., Salary, Food, Rent
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    }, // only allows income or expense
    amount: { type: Number, required: true, min: 0 }, // must be positive
    paymentMode: { type: String, default: "Cash" }, // e.g., Cash, Bank Transfer, Card
    description: { type: String, trim: true } // optional details
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

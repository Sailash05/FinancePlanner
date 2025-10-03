import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  paymentMode: string;
  description: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Transaction;
  setFormData: (tx: Transaction) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editMode: boolean;
}

export default function TransactionModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  editMode,
}: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md bg-black/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 border border-violet-800 shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            {editMode ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Date */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-2 rounded bg-black/70 text-white border border-violet-700"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Category</label>
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="p-2 rounded bg-black/70 text-white border border-violet-700"
              required
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as "income" | "expense" })
              }
              className="p-2 rounded bg-black/70 text-white border border-violet-700"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Amount</label>
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="p-2 rounded bg-black/70 text-white border border-violet-700"
              required
            />
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Payment Mode</label>
            <input
              type="text"
              placeholder="Payment Mode"
              value={formData.paymentMode}
              onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
              className="p-2 rounded bg-black/70 text-white border border-violet-700"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Description</label>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="p-2 rounded bg-black/70 text-white border border-violet-700"
            />
          </div>

          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-800 text-white py-2 rounded-lg transition cursor-pointer"
          >
            {editMode ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

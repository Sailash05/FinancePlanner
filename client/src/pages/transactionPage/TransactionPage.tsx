import { useState, useEffect } from "react";
import { CreditCard, Plus, Edit, Trash2, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionModal from "../../components/transactionComponent/TransactionModal";
import { TransactionService } from "../../service/transaction.service";
import AiInsightsModal from "../../components/transactionComponent/AiInsightsModal";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  paymentMode: string;
  description: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Transaction>({
    _id: "",
    date: "",
    category: "",
    type: "expense",
    amount: 0,
    paymentMode: "",
    description: "",
  });

  const [filter, setFilter] = useState({
    type: "all",
    category: "",
    date: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // AI Insights states
  const [aiInsights, setAiInsights] = useState<string>(``);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // ✅ Fetch transactions
  const fetchTransactions = async (nextPage = 1, append = false) => {
    try {
      setLoading(true);
      const params: any = { page: nextPage, limit };
      if (filter.type !== "all") params.type = filter.type;
      if (filter.category) params.category = filter.category;
      if (filter.date) params.date = filter.date;

      const res = await TransactionService.get(params);
      const data = res.data.data.transactions;

      if (append) setTransactions((prev) => [...prev, ...data]);
      else setTransactions(data);

      setHasMore(nextPage < res.data.data.totalPages);
    } catch (err: any) {
      console.error("Failed to fetch transactions:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch & fetch on filter change
  useEffect(() => {
    setPage(1);
    fetchTransactions(1, false);
  }, [filter]);

  // ✅ Open Add Modal
  const openAddPopup = () => {
    setFormData({
      _id: "",
      date: "",
      category: "",
      type: "expense",
      amount: 0,
      paymentMode: "",
      description: "",
    });
    setEditMode(false);
    setPopupOpen(true);
  };

  // ✅ Open Edit Modal
  const openEditPopup = (tx: Transaction) => {
    setFormData(tx);
    setEditMode(true);
    setPopupOpen(true);
  };

  // ✅ Handle Add / Update Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && formData._id) {
        await TransactionService.update(formData._id, formData);
      } else {
        await TransactionService.add(formData);
      }
      setPopupOpen(false);
      setEditMode(false);
      setPage(1);
      fetchTransactions(1, false);
    } catch (err: any) {
      console.error("Failed to save transaction:", err.response?.data?.message || err.message);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await TransactionService.delete(id);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (err: any) {
      console.error("Failed to delete transaction:", err.response?.data?.message || err.message);
    }
  };

  // ✅ Load more
  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage, true);
  };

  // ✅ Fetch AI Insights
  const fetchAIInsights = async () => {
    try {
      setLoadingInsights(true);
      const res = await TransactionService.getInsights();
      if (res.data.insights) setAiInsights(res.data.insights);
    } catch (err: any) {
      console.error("Failed to fetch AI insights:", err.response?.data?.message || err.message);
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard size={28} className="text-violet-400" />
          Transactions
        </h2>
        <div className="flex gap-2 max-md:flex-col">
          <button
            onClick={fetchAIInsights}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg shadow-md transition"
          >
            <Brain size={16} /> {loadingInsights ? "Analyzing..." : "Get AI Insights"}
          </button>
          <button
            onClick={openAddPopup}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg shadow-md transition"
          >
            <Plus size={16} /> Add Transaction
          </button>
        </div>
      </div>

      {/* Filter UI */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full">
  {/* Type */}
  <div className="relative w-full sm:w-auto">
    <select
      value={filter.type}
      onChange={(e) => setFilter({ ...filter, type: e.target.value })}
      className="w-full appearance-none cursor-pointer pl-10 pr-4 py-2 rounded-full bg-black/70 text-white border border-violet-700 focus:ring-2 focus:ring-violet-500 transition"
    >
      <option value="all">All Types</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">💰</span>
  </div>

  {/* Category */}
  <div className="relative w-full sm:w-auto">
    <input
      type="text"
      placeholder="Category"
      value={filter.category}
      onChange={(e) => setFilter({ ...filter, category: e.target.value })}
      className="w-full pl-10 pr-4 py-2 rounded-full bg-black/70 text-white border border-violet-700 focus:ring-2 focus:ring-violet-500 transition placeholder:text-gray-400"
    />
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏷️</span>
  </div>

  {/* Date */}
  <div className="relative w-full sm:w-auto">
    <input
      type="date"
      value={filter.date}
      onChange={(e) => setFilter({ ...filter, date: e.target.value })}
      className="w-full pl-10 pr-4 py-2 rounded-full bg-black/70 text-white border border-violet-700 focus:ring-2 focus:ring-violet-500 transition"
    />
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📅</span>
  </div>

  {/* Button */}
  <button
    onClick={() => fetchTransactions(1, false)}
    className="w-full sm:w-auto px-4 py-2 cursor-pointer bg-violet-600 hover:bg-violet-800 text-white rounded-lg transition"
  >
    Apply Filter
  </button>
</div>


      {/* Transactions Table */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="rounded-xl bg-black/50 backdrop-blur-lg border border-violet-800 shadow-lg max-w-screen"
>
  {/* Scroll wrapper */}
  <div className="overflow-x-auto w-full">
    <table className="w-[900px] sm:w-full text-left text-gray-200 border-separate border-spacing-0">
      <thead className="bg-violet-900/60 text-white">
        <tr>
          <th className="px-4 py-3 rounded-tl-xl">Date</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Payment Mode</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3 rounded-tr-xl">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr
            key={tx._id}
            className="border-b border-violet-700 hover:bg-violet-800/40 transition"
          >
            <td className="px-4 py-3">{tx.date.slice(0, 10)}</td>
            <td className="px-4 py-3">{tx.category}</td>
            <td className="px-4 py-3 capitalize">{tx.type}</td>
            <td
              className={`px-4 py-3 ${
                tx.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              ${tx.amount}
            </td>
            <td className="px-4 py-3">{tx.paymentMode}</td>
            <td className="px-4 py-3">{tx.description}</td>
            <td className="px-4 py-3 flex gap-2">
              <button
                onClick={() => openEditPopup(tx)}
                className="p-1 rounded-lg hover:bg-violet-700/40 transition"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(tx._id)}
                className="p-1 rounded-lg hover:bg-red-600/50 transition"
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.div>



      {/* Show More */}
      {hasMore && !loading && (
        <button
          onClick={handleShowMore}
          className="mt-2 cursor-pointer self-center px-4 py-2 bg-violet-600 hover:bg-violet-800 text-white rounded-lg transition"
        >
          Show More Transactions
        </button>
      )}
      {loading && <p className="text-center text-gray-400 mt-2">Loading...</p>}

      {/* Add/Edit Transaction Modal */}
      <AnimatePresence>
        {popupOpen && (
          <TransactionModal
            isOpen={popupOpen}
            onClose={() => setPopupOpen(false)}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            editMode={editMode}
          />
        )}
      </AnimatePresence>

      {/* AI Insights Modal */}
      {
        aiInsights && <AiInsightsModal aiInsights={aiInsights} setAiInsights={setAiInsights} />
      }

    </div>
  );
}

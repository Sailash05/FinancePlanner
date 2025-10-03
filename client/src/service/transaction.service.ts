import authAxios from "../api/authAxios";

type TransactionType = {
  _id?: string;
  date: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  paymentMode?: string;
  description?: string;
};

type QueryType = {
  question: string
}

export const TransactionService = {
  // Create a transaction
  add: (data: TransactionType) => authAxios.post("/api/transactions", data),

  // Get transactions with filters + pagination
  get: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    date?: string;
  }) => authAxios.get("/api/transactions", { params }),

  // Update transaction
  update: (id: string, data: TransactionType) =>
    authAxios.put(`/api/transactions/${id}`, data),

  // Delete transaction
  delete: (id: string) => authAxios.delete(`/api/transactions/${id}`),

  getInsights: () => authAxios.post('/api/ai/insights'),
  getAnalytics: () => authAxios.post('/api/ai/predict'),
  getRecommendation: () => authAxios.post('/api/ai/recommendations'),

  getQuery: () => authAxios.get('/api/ai/query'),
  postQuery: (data: QueryType) => authAxios.post('/api/ai/query', data)
};

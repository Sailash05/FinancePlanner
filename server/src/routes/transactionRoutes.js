import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

import { getTransaction, addTransaction, updateTransaction, deleteTransaction } from '../controller/transactionController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getTransaction);
router.post('/', addTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
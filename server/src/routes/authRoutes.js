import express from 'express';
const router = express.Router();

import { createUser, verifyTokenController, loginUser } from '../controller/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/createuser', createUser);
router.post('/loginuser', loginUser);

router.get('/verifytoken', verifyToken, verifyTokenController);

export default router;
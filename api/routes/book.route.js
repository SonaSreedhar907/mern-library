import express from 'express';
import { rentBook, returnBook } from '../controllers/bookController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to rent a book
router.post('/rent', rentBook);

// Route to return a book
router.post('/return', returnBook);


export default router;
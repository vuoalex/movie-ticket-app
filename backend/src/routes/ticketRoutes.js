import express from 'express';
import { create, getAll, getById, redeem } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll)
router.get('/:id', getById);
router.patch('/:id/redeem', redeem);

export default router;
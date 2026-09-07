import express from 'express';
import { create, getAll } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll)

export default router;
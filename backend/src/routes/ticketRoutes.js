import express from 'express';
import { create } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', create);

export default router;
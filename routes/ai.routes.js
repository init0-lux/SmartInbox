import express from 'express';
import { analyzeEmail, createCalendarEvent } from '../controllers/ai.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/analyze', authorize, analyzeEmail);
router.post('/event', authorize, createCalendarEvent);

export default router;

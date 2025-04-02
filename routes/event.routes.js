import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/event.controller.js';

const router = Router();

router.get('/', authorize, getEvents);
router.post('/', authorize, createEvent);
router.put('/:id', authorize, updateEvent);
router.delete('/:id', authorize, deleteEvent);

export default router;

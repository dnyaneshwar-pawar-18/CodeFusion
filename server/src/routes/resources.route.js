import express from 'express'
import { createResources, downvoteResource, fetchResources, upvoteResource } from '../controllers/resource.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', createResources);

router.get('/fetchResources', fetchResources);

router.patch("/upvote/:id", protectRoute,  upvoteResource);
router.patch("/downvote/:id", protectRoute,  downvoteResource);

export default router;
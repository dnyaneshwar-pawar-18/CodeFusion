import express from 'express'
import { checkAuth, getMentees, getMentors, login, logout, signup, subscribeMentor } from '../controllers/auth.controller.js';
import { protectMentorRoute, protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/subscribe/:_id', protectRoute,  subscribeMentor);

router.get('/checkAuth', protectRoute, checkAuth);
router.get('/getMentors', protectRoute,  getMentors);
router.get('/getMentees', protectMentorRoute,  getMentees);


export default router;
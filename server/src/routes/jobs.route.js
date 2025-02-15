import express from 'express'
import { fetchJobData, getJobPreferenceData, handleJobPreferenceData } from '../controllers/job.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', fetchJobData);
router.post('/jobPreference', protectRoute,  handleJobPreferenceData);
router.get('/getJobPreferenceData/:userId', getJobPreferenceData);


export default router;  

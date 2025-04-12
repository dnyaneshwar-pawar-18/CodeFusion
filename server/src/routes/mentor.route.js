import express from "express";
import multer from "multer";

import {
  applyMentor,
  checkMentorAuth,
  fetchMentorsData,
  getSpecificMentor,
  loginMentor,
  logoutMentor,
  editMentorProfile,
  getDomainSpecificMentorData
} from "../controllers/mentor.controller.js";
import { protectMentorRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/apply", upload.single("profileImg"), applyMentor);
router.post("/login", loginMentor);
router.post("/logout", logoutMentor);

router.get("/checkMentorAuth", protectMentorRoute, checkMentorAuth);
router.get("/fetchMentors", fetchMentorsData);
router.get("/specificMentor/:_id", getSpecificMentor);
router.get('/doamin-specific-mentor/:domain', getDomainSpecificMentorData);

router.patch('/profile/:_id/edit', editMentorProfile);

export default router;

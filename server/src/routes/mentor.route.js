import express from "express";
import {
  applyMentor,
  checkMentorAuth,
  fetchMentorsData,
  getSpecificMentor,
  loginMentor,
  logoutMentor,
  editMentorProfile
} from "../controllers/mentor.controller.js";
import { protectMentorRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/apply", applyMentor);
router.post("/login", loginMentor);
router.post("/logout", logoutMentor);

router.get("/checkMentorAuth", protectMentorRoute, checkMentorAuth);
router.get("/fetchMentors", fetchMentorsData);
router.get("/specificMentor/:_id", getSpecificMentor);

router.patch('/profile/:_id/edit', editMentorProfile);

export default router;

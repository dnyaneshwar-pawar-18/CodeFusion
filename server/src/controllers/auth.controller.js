import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Mentor from "../models/mentor.model.js";

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });

        // console.log(newUser);

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                currentLocation: newUser.currentLocation,
                contactNumber: newUser.contactNumber,
                preferredRole: newUser.preferredRole,
                preferredLocation: newUser.preferredLocation,
                skills: newUser.skills,
                experienceLevel: newUser.experienceLevel,
                jobType: newUser.jobType,
                expectedSalary: newUser.expectedSalary,
            });

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message); //? Todo
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("Password match:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error.message);
        res.status(400).json({ message: "Internal server error" });
    }
};

export const subscribeMentor = async (req, res) => {
    const { role, goal, message } = req.body;
    const { _id: mentorId } = req.params;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const alreadySubscribed = user.mentorSubscriptions.some(
            (sibscription) => sibscription.mentorId.toString() === mentorId
        );

        if (alreadySubscribed) {
            return res
                .status(400)
                .json({ message: "You have already applied for this mentor" });
        }

        user.mentorSubscriptions.push({
            mentorId,
            role,
            goal,
            message,
        });

        await user.save();

        res.status(200).json({ message: 'Successfully applied for mentor' });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(400).json({ message: "Internal server error" });
    }
};

export const getMentors = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const mentorIds = user.mentorSubscriptions.map((subscription) => subscription.mentorId);

        if (mentorIds.length === 0) {
            return res.status(404).json({ message: "No mentors found for this user" });
        }

        const mentors = await Mentor.find({ _id: { $in: mentorIds } });

        res.status(200).json(mentors);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getMentees = async (req, res) => {
    try {
        const activeMentorId = req.mentor._id;

        const mentees = await User.find({
            "mentorSubscriptions.mentorId": activeMentorId,
        }).select("name email mentorSubscriptions");

        console.log("Fetched Mentees:", mentees);  // Debugging: check fetched data

        if (!mentees || mentees.length === 0) {
            return res.status(404).json({ message: "No mentees found for this mentor" });
        }

        const filteredMentees = mentees.map((mentee) => ({
            ...mentee.toObject(),
            mentorSubscriptions: mentee.mentorSubscriptions.filter(
                (subscription) => subscription.mentorId.toString() === activeMentorId.toString()
            ),
        }));

        console.log("Filtered Mentees:", filteredMentees);

        res.status(200).json({ mentees: filteredMentees });
    } catch (error) {
        console.error("Error fetching mentees:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

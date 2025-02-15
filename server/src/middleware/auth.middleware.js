import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import Mentor from '../models/mentor.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No Token Provided' })
        }
        console.log('in middleware...')

        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Token' })
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const protectMentorRoute = async (req, res, next) => {
    try {
        const token = req.cookies.mentor_jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No Token Provided' })
        }

        const decoded = jwt.verify(token, process.env.JWT_MENTOR_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Token' })
        }

        const mentor = await Mentor.findById(decoded.mentorId).select('-password');

        if (!mentor) {
            return res.status(404).json({ message: 'User not found' })
        }

        req.mentor = mentor;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
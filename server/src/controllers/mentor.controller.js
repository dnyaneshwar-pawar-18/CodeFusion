import { generateMentorToken } from "../lib/utils.js";
import Mentor from "../models/mentor.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js";
// import multer from "multer";

// const storage = multer.memoryStorage(); // Store file in memory
// const upload = multer({ storage });

export const applyMentor = async (req, res) => {
    const { email, password, profileImg } = req.body;
    console.log(profileImg)
    try {
        const mentor = await Mentor.findOne({ email });
        if (mentor) {
            return res.status(400).json({ message: 'Mentor already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let cloudinaryResponse = null;

        if (profileImg) {
            cloudinaryResponse = await cloudinary.uploader.upload(profileImg);
        }

        console.log(cloudinaryResponse)

        const newMentor = new Mentor({  
            ...req.body,
            password: hashedPassword,
            profileImg: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
        })
        console.log(newMentor);
        if (newMentor) {
            generateMentorToken(newMentor._id, res);
            await newMentor.save();
            console.log('Mentor saved successfully.');

            res.status(200).json({
                _id: newMentor._id,
                firstName: newMentor.firstName,
                lastName: newMentor.lastName,
                email: newMentor.email,
                domain: newMentor.domain,
                role: newMentor.role,
                company: newMentor.company,
                location: newMentor.location,
                category: newMentor.category,
                skills: newMentor.skills,
                bio: newMentor.bio,
                linkedInUrl: newMentor.linkedInUrl,
                profileImg: newMentor.profileImg,
            });

        } else {
            res.status(400).json({ message: 'Invalid mentor data' });
        }

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message); //? Todo
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


export const loginMentor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const mentor = await Mentor.findOne({ email });
        console.log(mentor);

        if (!mentor) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, mentor.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        generateMentorToken(mentor._id, res);

        res.status(200).json({
            _id: mentor._id,
            firstName: mentor.firstName,
            lastName: mentor.lastName,
            email: mentor.email,
        })

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message); //? Todo
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const logoutMentor = (req, res) => {
    try {
        res.cookie('mentor_jwt', '', { maxAge: 0 });
        res.status(200).json({ message: "Logged Out successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const checkMentorAuth = async (req, res) => {
    try {
        res.status(200).json(req.mentor)
    } catch (error) {
        console.log('Error in checkMentorAuth controller: ', error.message);
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const fetchMentorsData = async (req, res) => {
    try {
        const response = await Mentor.find();
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.log('Error while fetching mentors data', error.message);
        res.status(500).json({ message: 'Internal server error' })
    }
}


export const getSpecificMentor = async (req, res) => {
    const { _id } = req.params;
    try {
        const mentor = await Mentor.findById(_id); // Pass _id directly
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' }); // Handle case when mentor is not found
        }
        console.log(mentor);
        res.status(200).json(mentor);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const editMentorProfile = async (req, res) => {
    const { password, ...otherUpdates } = req.body;
    const { _id: mentorId } = req.params;
    console.log(mentorId)

    try {
        const updates = { ...otherUpdates };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        console.log(updates)

        const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updates, { new: true });

        if (!updatedMentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', mentor: updatedMentor });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const getDomainSpecificMentorData = async (req, res) => {
    const { domain } = req.params;
    console.log('domain', domain)
    const formattedDomain = domain.replace(/-/g, ' ').toLowerCase();
    console.log('formattedDomain', formattedDomain)
    try {
        const mentors = await Mentor.find({
            $expr: { $eq: [{ $toLower: "$domain" }, formattedDomain] }
        });

        if (mentors.length === 0) {
            return res.status(404).json({ message: "404 - Not Found!" });
        }

        res.status(200).json(mentors);
    } catch (error) {
        console.error('Error getting domain specific mentor data:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}
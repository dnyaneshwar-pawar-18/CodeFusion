import mongoose from "mongoose";

const jobPreferenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: { type: String, required: true },
    currentLocation: { type: String },
    contactNumber: { type: String },

    // Professional Details
    skills: [{ type: String, required: true }],
    experienceLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    preferredRoles: [{ type: String }],

    // Job Preferences
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Remote"],
        default: "Full-time",
    },
    preferredLocation: { type: String },
    expectedSalary: { type: Number },
});

const JobPreference = mongoose.model("JobPreference", jobPreferenceSchema);

export default JobPreference;
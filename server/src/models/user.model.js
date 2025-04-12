import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        lastName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },

        currentLocation: {
            type: String,
            trim: true,
        },

        contactNumber: {
            type: String,
            match: [/^\d{10}$/, "Contact number must be a 10-digit number"],
        },

        skills: {
            type: [String],
            required: [true, "At least one skill is required"],
        },

        experienceLevel: {
            type: String,
            enum: {
                values: ["Beginner", "Intermediate", "Advanced"],
                message: "Experience level must be Beginner, Intermediate, or Advanced",
            },
            default: "Beginner",
        },

        domain: {
            type: String,
            enum: {
                values: ["AI/ML", "Backend Developer", "Full Stack Developer", "Cyber Security"],
                message: '{VALUE} is not a valid category',
            },
            required: [true, 'Domain is required'],
        },

        jobType: {
            type: String,
            enum: {
                values: ["Full-time", "Part-time", "Internship", "Remote"],
                message: "Job type must be Full-time, Part-time, Internship, or Remote",
            },
            default: "Full-time",
        },

        preferredLocation: {
            type: String,
            trim: true,
        },

        expectedSalary: {
            type: Number,
            min: [0, "Expected salary must be a positive number"],
        },

        mentorSubscriptions: [
            {
                mentorId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Mentor",
                    required: [true, "Mentor ID is required"],
                },
                role: {
                    type: String,
                    trim: true,
                },
                goal: {
                    type: String,
                    trim: true,
                },
                message: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

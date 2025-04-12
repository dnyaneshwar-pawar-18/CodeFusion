import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    domain: {
        type: String,
        enum: {
            values: ["AI ML", "Backend Developer", "Full Stack Developer", "Cyber Security"],
            message: '{VALUE} is not a valid category',
        },
        required: [true, 'Category is required'],
    },
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    category: {
        type: String,
        enum: {
            values: ["Engineering & Data", "UX & Design", "Business & Management", "Product & Marketing"],
            message: '{VALUE} is not a valid category',
        },
        required: [true, 'Category is required'],
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required'],
    },
    bio: {
        type: String,
        required: [true, 'Bio is required'],
        minlength: [50, 'Bio must be at least 50 characters long'],
    },
    linkedInUrl: {
        type: String,
        required: [true, 'LinkedIn URL is required'],
        // validate: {
        //     validator: function (v) {
        //         return /^(https?:\/\/)?([\w\d\-]+\.)*linkedin\.com\/.*$/.test(v);
        //     },
        //     message: 'Invalid LinkedIn URL',
        // },
    },

    profileImg: {
        type: String,
        required: [true, 'Image is required'],
    },
}, { timestamps: true });

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,   
        unique: true,
        lowercase: true,   
        trim: true,      
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    
    password: {
        type: String,
        required: true, 
        minlength: 6,
    },

    mentorSubscriptions: [
        {
            mentorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Mentor',  // Reference to the Mentor model
                required: true,
            },
            role: String,
            goal: String,
            message: String,
        },
    ],

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

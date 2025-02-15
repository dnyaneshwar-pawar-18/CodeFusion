import mongoose from 'mongoose'

const feedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required'],
    },
    aboutPost: {
        type: String,
        required: [true, 'Say somehting about your post'],
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required'],
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            message: {
                type: String,
                required: true 
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]


}, { timestamps: true })

const Feed = mongoose.model('Feed', feedSchema);

export default Feed;
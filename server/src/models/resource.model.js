// import mongoose from "mongoose";

// const resourceSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true,
//     minlength: [3, 'Title must be at least 3 characters long'],
//     maxlength: [100, 'Title must be under 100 characters']
//   },
//   url: {
//     type: String,
//     required: [true, 'Resource URL is required'],
//     // unique: true,
//   },
//   category: {
//     type: String,
//     enum: {
//       values: ['Docs', 'Courses', 'Tools', 'Communities', 'Jobs'],
//       message: 'Category must be one of Docs, Courses, Tools, Communities, or Jobs'
//     },
//     required: [true, 'Category is required']
//   },
//   description: {
//     type: String,
//     maxlength: [300, 'Description must be under 300 characters']
//   },
//   tags: {
//     type: [String],
//     required: [true, 'Tags are required'],
//   },

//   resourceImage: {
//     type: String,
//     required: [true, 'Image is required'],
//   },

//   addedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: 'addedByModel',  // Dynamic reference to 'User' or 'Mentor'
//     required: [true, 'Resource must be associated with a user or mentor']
//   },
//   addedByModel: {
//     type: String,
//     required: true,
//     enum: ['User', 'Mentor'],  // Ensures only valid roles
//     message: 'Role must be either User or Mentor'
//   },

//   upvotes: {
//     type: Number,
//     default: 0,
//     min: [0, 'Upvotes cannot be negative']
//   },
//   downvotes: {
//     type: Number,
//     default: 0,
//     min: [0, 'Downvotes cannot be negative']
//   },
//   comments: [{
//     commentedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: 'commentedByModel',  // Dynamic reference to 'User' or 'Mentor'
//       // required: [true, 'Comment must be associated with a user or mentor']
//     },
//     commentedByModel: {
//       type: String,
//       // required: true,
//       enum: ['User', 'Mentor'],  // Ensures only valid roles
//       message: 'Role must be either User or Mentor'
//     },
//     text: {
//       type: [String],
//       // required: [true, 'Comment cannot be empty']
//     },
//     createdAt: {
//       type: Number,
//       default: () => Date.now()  // Stores timestamp directly
//     }
//   }],
//   createdAt: {
//     type: Number,
//     default: () => Date.now() // Stores timestamp directly
//   }
// }, {
//   timestamps: true
// });

// const Resource = mongoose.model('Resource', resourceSchema);

// export default Resource;

import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be under 100 characters"],
    },
    url: {
      type: String,
      required: [true, "Resource URL is required"],
    },
    category: {
      type: String,
      enum: {
        values: ["Docs", "Courses", "Tools", "Communities", "Jobs"],
        message:
          "Category must be one of Docs, Courses, Tools, Communities, or Jobs",
      },
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      maxlength: [300, "Description must be under 300 characters"],
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
    },
    resourceImage: {
      type: String,
      required: [true, "Image is required"],
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User collection
      required: [true, "Resource must be associated with a user"],
    },

    upvotes: {
      type: Number,
      default: 0,
      min: [0, "Upvotes cannot be negative"],
    },
    downvotes: {
      type: Number,
      default: 0,
      min: [0, "Downvotes cannot be negative"],
    },

    upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    comments: [
      {
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: [true, "Comment cannot be empty"],
        },
        createdAt: {
          type: Number,
          default: () => Date.now(),
        },
      },
    ],
    createdAt: {
      type: Number,
      default: () => Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;

import mongoose from 'mongoose'
import cloudinary from "../lib/cloudinary.js";
import Resource from "../models/resource.model.js";

export const createResources = async (req, res) => {
    const { resourceImage } = req.body;
    // console.log('req.body', req.body)
    try {
        let cloudinaryResponse = null;

        if (resourceImage) {
            cloudinaryResponse = await cloudinary.uploader.upload(resourceImage);
        }

        const newResource = new Resource({
            ...req.body,
            resourceImage: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
        })

        if (newResource) {
            await newResource.save();
            console.log('Resource saved successfully.')
        }

        console.log('newResource', newResource)

        res.status(200).json({
            _id: newResource._id,
            title: newResource.title,
            url: newResource.url,
            resourceImage: newResource.resourceImage,
            description: newResource.description,
            tags: newResource.tags,
        })
    }
    catch (error) {
        console.error("Error creating resource:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const fetchResources = async (req, res) => {
    try {
        const resources = await Resource.find().lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents, making the query faster.
        res.status(200).json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ message: "Failed to fetch resources", error: error.message });
    }
};


export const upvoteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString(); // Ensure user ID is a string

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid resource ID" });
        }

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        const upvotedBy = resource.upvotedBy.map(uid => uid.toString());
        const downvotedBy = resource.downvotedBy.map(uid => uid.toString());

        if (upvotedBy.includes(userId)) {
            return res.status(400).json({ message: "You have already upvoted this resource" });
        }

        if (downvotedBy.includes(userId)) {
            resource.downvotedBy = resource.downvotedBy.filter(uid => uid.toString() !== userId);
            resource.downvotes -= 1;
        }

        resource.upvotedBy.push(userId);
        resource.upvotes += 1;

        console.log(resource)
        await resource.save();
        res.status(200).json(resource);
    } catch (error) {
        console.error("Upvote Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const downvoteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString(); // Ensure user ID is a string

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid resource ID" });
        }

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        // Convert ObjectIds in the arrays to string for accurate comparison
        const upvotedBy = resource.upvotedBy.map(uid => uid.toString());
        const downvotedBy = resource.downvotedBy.map(uid => uid.toString());

        if (downvotedBy.includes(userId)) {
            // If user already downvoted, remove the downvote (toggle behavior)
            resource.downvotedBy = resource.downvotedBy.filter(uid => uid.toString() !== userId);
            resource.downvotes -= 1;
        } else {
            // If user had previously upvoted, remove from upvotedBy and decrease upvotes
            if (upvotedBy.includes(userId)) {
                resource.upvotedBy = resource.upvotedBy.filter(uid => uid.toString() !== userId);
                resource.upvotes -= 1;
            }

            // Add user to downvotedBy and increase downvotes
            resource.downvotedBy.push(userId);
            resource.downvotes += 1;
        }
        console.log(resource)

        await resource.save();
        res.status(200).json(resource);
    } catch (error) {
        console.error("Downvote Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


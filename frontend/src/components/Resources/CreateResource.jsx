import { Upload } from "lucide-react";
import React, { useState } from "react";
import { useResourceStore } from "../../store/useResourceStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useMentorStore } from "../../store/useMentorStore";

const CreateResource = () => {
    const initialState = {
        title: "",
        url: "",
        category: "",
        description: "",
        tags: [],
        addedBy: '',
        resourceImage: "",
    };

    const [resource, setResource] = useState(initialState);
    const [tagInput, setTagInput] = useState("");
    const { createResource, loading } = useResourceStore();
    const { user } = useAuthStore();
    const { mentor } = useMentorStore();

    const handleChange = (e) => {
        setResource({ ...resource, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (!e.target.files.length) return;

        const file = e.target.files[0];
        console.log(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setResource({ ...resource, resourceImage: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTags = tagInput
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0 && !resource.tags.includes(tag));

            if (newTags.length > 0) {
                setResource(prev => ({
                    ...prev,
                    tags: [...prev.tags, ...newTags],
                }));
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setResource(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const addedBy = user?._id || mentor?._id;
            const resourceData = { ...resource, addedBy };

            console.log("Form data before submission:", resourceData);
            const response = await createResource(resourceData);
            console.log(response)
            if (response?.status === 200) {
                setResource(initialState);
                setTagInput("");
                console.log("Resource added successfully!");
            } else {
                console.error("Failed to add resource:", response?.data || response);
            }
        } catch (error) {
            console.error("Error submitting resource:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-2xl bg-base-300 shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">
                    Add a New Resource
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label"><span className="text-base-content">Title</span></label>
                        <input
                            type="text"
                            name="title"
                            value={resource.title}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter resource title"
                            required
                        />
                    </div>

                    <div>
                        <label className="label"><span className="text-base-content">Resource URL</span></label>
                        <input
                            type="url"
                            name="url"
                            value={resource.url}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Enter resource link"
                            required
                        />
                    </div>

                    <div className="mt-1 flex items-center">
                        <input
                            type="file"
                            id="resourceImage"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="resourceImage" className="cursor-pointer btn btn-outline btn-primary mt-4">
                            Upload Resource Image <Upload className="h-5 w-5 inline-block ml-2" />
                        </label>
                        {resource.resourceImage && <span className="ml-3 text-sm text-primary">Image uploaded</span>}
                    </div>

                    <div>
                        <label className="label"><span className="text-base-content">Category</span></label>
                        <select
                            name="category"
                            value={resource.category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Docs">Docs</option>
                            <option value="Courses">Courses</option>
                            <option value="Tools">Tools</option>
                            <option value="Communities">Communities</option>
                            <option value="Jobs">Jobs</option>
                        </select>
                    </div>

                    <div>
                        <label className="label"><span className="text-base-content">Description</span></label>
                        <textarea
                            name="description"
                            value={resource.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full"
                            placeholder="Write a short description (max 300 chars)"
                            maxLength={300}
                        />
                    </div>

                    <div>
                        <label className="label"><span className="text-base-content">Tags (comma separated)</span></label>

                        <div className="flex flex-wrap gap-2 mb-2">
                            {resource.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg flex items-center">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="ml-2 text-red-500 font-bold">&times;</button>
                                </span>
                            ))}
                        </div>

                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagKeyDown}
                            className="input input-bordered w-full"
                            placeholder="e.g. React, JavaScript, Backend"
                        />
                    </div>

                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary w-1/2">
                            Submit Resource
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateResource;

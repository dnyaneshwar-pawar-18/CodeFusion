import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMentorStore } from '../../store/useMentorStore';
import { ArrowRight, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const MentorApply = () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        domain: '',
        role: '',
        company: '',
        location: '',
        category: '',
        skills: '',
        bio: '',
        linkedInUrl: '',
        profileImg: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const { apply, loading } = useMentorStore();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log("Form data before submission:", formData);

            const response = await apply(formData);

            if (response && response.status === 200) {
                setFormData(initialFormData);
                console.log("Form submitted successfully, form data reset.");
            }
        } catch (error) {
            console.error("Error applying for mentor:", error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('file...........', file)
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({ ...formData, profileImg: reader.result });
            };

            reader.readAsDataURL(file); // base64
        }
    };




    return (
        <div className="min-h-screen overflow-y-scroll p-4">
            <div className="flex flex-col justify-center items-center sm:px-6 lg:px-6 mb-10 mt-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-extrabold text-primary">
                        Apply as a mentor
                    </h2>
                </motion.div>

                <motion.div
                    className="mt-8 w-full max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bg-base-200 p-8 shadow-lg rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="john@gmail.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Choose a Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="password"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Domain
                                    </label>
                                    <select
                                        value={formData.domain}
                                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Please select...</option>
                                        <option value="AI ML">AI/ML</option>
                                        <option value="Backend Developer">Backend Developer</option>
                                        <option value="Full Stack Developer">Full Stack Developer</option>
                                        <option value="Cyber Security">Cyber Security</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Company <span className="text-base-content/70">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="input input-bordered w-full"
                                        placeholder="e.g. Google"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="e.g. India"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Please select...</option>
                                        <option value="Engineering & Data">Engineering & Data</option>
                                        <option value="UX & Design">UX & Design</option>
                                        <option value="Business & Management">Business & Management</option>
                                        <option value="Product & Marketing">Product & Marketing</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="e.g. backend developer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Skills <span>(comma-separated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="e.g. JavaScript, React"
                                    />
                                </div>
                            </div>

                            <div className="mt-1 flex items-center">
                                <input
                                    type="file"
                                    id="profileImg"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="profileImg"
                                    className="cursor-pointer btn btn-outline btn-primary"
                                >
                                    Upload Profile Image
                                    <Upload className="h-5 w-5 inline-block ml-2" />
                                </label>
                                {formData.profileImg && <span className="ml-3 text-sm text-primary">Image uploaded</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    Bio
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    required
                                    className="textarea textarea-bordered w-full h-28"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-base-content mb-2">
                                    LinkedIn URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.linkedInUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-1/2 mt-4"
                                >
                                    {loading ? 'Applying...' : 'Apply Now'}
                                </button>
                            </div>

                            <p className="mt-8 text-center text-lg text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/mentors/login"
                                    className="text-lg text-primary hover:scale-50"
                                >
                                    Login here<ArrowRight className="inline h-4 w-4" />
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MentorApply;









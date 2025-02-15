import React from "react";
import useForm from "../hooks/useForm";
import { useJobStore } from "../../store/useJobStore";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const PreferenceForm = () => {
    const initialFormData = {
        fullName: "",
        currentLocation: "",
        contactNumber: "",
        skills: "",
        experienceLevel: "Beginner",
        preferredRoles: "",
        jobType: "Full-time",
        preferredLocation: "",
        expectedSalary: 0,
    };

    const { values, handleChange, resetForm } = useForm(initialFormData);

    const { jobPreference, loading } = useJobStore();

    function handleSubmit(e) {
        e.preventDefault();
        jobPreference(values);
        resetForm(initialFormData)
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col justify-center items-center sm:px-6 lg:px-8 mt-5">
                <motion.div
                    className="w-full max-w-md text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-center text-3xl font-extrabold text-primary">
                        Job Preference Form
                    </h2>
                </motion.div>

                <motion.div
                    className="mt-6 w-full max-w-xl mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bg-base-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control">
                                <div>
                                    <h3 className="text-lg font-semibold text-accent">
                                        Personal Details
                                    </h3>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                Full Name
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="fullName"
                                                type="text"
                                                required
                                                value={values.fullName}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                {" "}
                                                Current Location
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="currentLocation"
                                                type="text"
                                                required
                                                value={values.currentLocation}
                                                onChange={handleChange}
                                                placeholder="e.g., Pune"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                Contact Number
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="contactNumber"
                                                type="text"
                                                required
                                                value={values.contactNumber}
                                                onChange={handleChange}
                                                placeholder="+91 9876543210"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-accent mt-5">
                                        Professional Details
                                    </h3>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                Skills (comma-separated)
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="skills"
                                                type="text"
                                                required
                                                value={values.skills}
                                                onChange={handleChange}
                                                placeholder="e.g., JavaScript, React, Node.js"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                Experience Level
                                            </span>
                                        </label>
                                        <select
                                            name="experienceLevel"
                                            value={values.experienceLevel}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-base"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                Preferred Roles
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="preferredRoles"
                                                type="text"
                                                required
                                                value={values.preferredRoles}
                                                onChange={handleChange}
                                                placeholder="e.g., Frontend Developer, Backend Developer"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-accent mt-5">
                                        Job Preferences
                                    </h3>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                Job Type
                                            </span>
                                        </label>
                                        <select
                                            name="jobType"
                                            value={values.jobType}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-base"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                {" "}
                                                Preferred Location
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="preferredLocation"
                                                type="text"
                                                required
                                                value={values.preferredLocation}
                                                onChange={handleChange}
                                                placeholder="e.g., Mumbai, Bengaluru"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-lg label-text text-base-content">
                                                {" "}
                                                Expected Salary (per annum)
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="expectedSalary"
                                                type="number"
                                                required
                                                value={values.expectedSalary}
                                                onChange={handleChange}
                                                placeholder="e.g., 500000"
                                                className="input input-bordered w-full text-base"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <button type="submit" className="btn btn-primary w-full text-lg font-semibold" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader
                                                    className="mr-2 h-5 w-5 animate-spin"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </>
                                        ) : (
                                            <>Submit</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PreferenceForm;




/*

import React from "react";
import useForm from "../hooks/useForm";
import { useJobStore } from "../../store/useJobStore";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const PreferenceForm = () => {
    const initialFormData = {
        fullName: "",
        currentLocation: "",
        contactNumber: "",
        skills: "",
        experienceLevel: "Beginner",
        preferredRoles: "",
        jobType: "Full-time",
        preferredLocation: "",
        expectedSalary: "",
    };

    const { values, handleChange } = useForm(initialFormData);
    const { jobPreference, loading } = useJobStore();

    function handleSubmit(e) {
        e.preventDefault();
        jobPreference(values);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl bg-base-200 p-8 shadow-lg rounded-xl">
                <motion.h2
                    className="text-center text-3xl font-extrabold text-primary"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Job Preference Form
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit}
                    className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-accent">Personal Details</h3>

                        <label className="form-control">
                            <span className="label-text">Full Name</span>
                            <input
                                name="fullName"
                                type="text"
                                required
                                value={values.fullName}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="input input-bordered w-full"
                            />
                        </label>

                        <label className="form-control">
                            <span className="label-text">Current Location</span>
                            <input
                                name="currentLocation"
                                type="text"
                                required
                                value={values.currentLocation}
                                onChange={handleChange}
                                placeholder="e.g., Pune"
                                className="input input-bordered w-full"
                            />
                        </label>

                        <label className="form-control">
                            <span className="label-text">Contact Number</span>
                            <input
                                name="contactNumber"
                                type="text"
                                required
                                value={values.contactNumber}
                                onChange={handleChange}
                                placeholder="+91 9876543210"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-accent">Professional Details</h3>

                        <label className="form-control">
                            <span className="label-text">Skills (comma-separated)</span>
                            <input
                                name="skills"
                                type="text"
                                required
                                value={values.skills}
                                onChange={handleChange}
                                placeholder="e.g., JavaScript, React, Node.js"
                                className="input input-bordered w-full"
                            />
                        </label>

                        <label className="form-control">
                            <span className="label-text">Experience Level</span>
                            <select
                                name="experienceLevel"
                                value={values.experienceLevel}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </label>

                        <label className="form-control">
                            <span className="label-text">Preferred Roles</span>
                            <input
                                name="preferredRoles"
                                type="text"
                                required
                                value={values.preferredRoles}
                                onChange={handleChange}
                                placeholder="e.g., Frontend Developer, Backend Developer"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>

                    <div className="space-y-4 col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold text-accent">Job Preferences</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="form-control">
                                <span className="label-text">Job Type</span>
                                <select
                                    name="jobType"
                                    value={values.jobType}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </label>

                            <label className="form-control">
                                <span className="label-text">Preferred Location</span>
                                <input
                                    name="preferredLocation"
                                    type="text"
                                    required
                                    value={values.preferredLocation}
                                    onChange={handleChange}
                                    placeholder="e.g., Mumbai, Bengaluru"
                                    className="input input-bordered w-full"
                                />
                            </label>

                            <label className="form-control">
                                <span className="label-text">Expected Salary (per annum)</span>
                                <input
                                    name="expectedSalary"
                                    type="number"
                                    required
                                    value={values.expectedSalary}
                                    onChange={handleChange}
                                    placeholder="e.g., 500000"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-center">
                        <button className="btn btn-primary w-full sm:w-1/2 text-lg font-semibold">
                            {loading ? (
                                <>
                                    <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                <>Submit</>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default PreferenceForm;

*/
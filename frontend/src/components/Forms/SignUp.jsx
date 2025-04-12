import React, { useState } from "react";
import { motion } from "framer-motion";
import useForm from "../hooks/useForm";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link, Navigate } from "react-router-dom";
import { User, Mail, Lock, MapPin, Phone, Briefcase, DollarSign, ArrowRight, UserPlus, Loader, Layers, Locate } from "lucide-react";

const SignUp = () => {
    const { values, handleChange, resetForm } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        currentLocation: "",
        contactNumber: "",
        domain: "",
        preferredLocation: "",
        skills: "",
        experienceLevel: "Beginner",
        jobType: "Full-time",
        expectedSalary: "",
    });

    const { signup, loading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(values);
        resetForm();
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-base-100 mt-16 px-4">
            <motion.div
                className="w-full max-w-md text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-primary text-3xl font-bold">Sign Up</h2>
            </motion.div>

            <motion.div
                className="mt-6 w-full max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="bg-base-300 py-8 px-6 shadow-lg rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-lg">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="firstName" type="text" required value={values.firstName} onChange={handleChange} placeholder="First Name" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-lg">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="lastName" type="text" required value={values.lastName} onChange={handleChange} placeholder="Last Name" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-lg">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="email" type="email" required value={values.email} onChange={handleChange} placeholder="you@example.com" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-lg">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="password" type="password" required value={values.password} onChange={handleChange} placeholder="••••••••" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-lg">Current Location</label>
                                <div className="relative">
                                    <Locate className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="currentLocation" type="text" value={values.currentLocation} onChange={handleChange} placeholder="City, Country" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-lg">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="contactNumber" type="text" pattern="\d{10}" value={values.contactNumber} onChange={handleChange} placeholder="1234567890" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-lg">Preferred Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="preferredLocation" type="text" value={values.preferredLocation} onChange={handleChange} placeholder="City, Country" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-lg">Domain</label>
                                <select name="domain" value={values.domain} onChange={handleChange} className="select select-bordered w-full">
                                    <option value="">Please select...</option>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-lg">Skills</label>
                                <input name="skills" type="text" required value={values.skills} onChange={handleChange} placeholder="e.g., React, Node.js" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label text-lg">Experience Level</label>
                                <select name="experienceLevel" value={values.experienceLevel} onChange={handleChange} className="select select-bordered w-full">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-lg">Job Type</label>
                                <select name="jobType" value={values.jobType} onChange={handleChange} className="select select-bordered w-full">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-Time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label text-lg">Expected Salary</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input name="expectedSalary" type="number" min="0" value={values.expectedSalary} onChange={handleChange} placeholder="e.g., 50000" className="input input-bordered w-full pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full text-center">
                            <button className="btn btn-primary w-1/2 text-lg font-semibold">
                                {loading ? (
                                    <>
                                        <Loader
                                            className="mr-2 h-5 w-5 animate-spin"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Sign up
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="mt-8 text-center text-lg text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/user/signin"
                                className="text-lg text-primary hover:scale-50"
                            >
                                Sign in here <ArrowRight className="inline h-4 w-4" />
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;


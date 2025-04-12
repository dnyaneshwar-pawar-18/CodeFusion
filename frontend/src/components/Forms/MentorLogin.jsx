import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useMentorStore } from "../../store/useMentorStore";

const MentorLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { loginMentor, loading } = useMentorStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginMentor(formData);
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-base-100 mt-16 px-4">
            <motion.div
                className="w-full max-w-md text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-primary text-3xl font-bold">Login as Mentor</h2>
            </motion.div>

            <motion.div
                className="mt-6 w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="bg-base-300 py-8 px-6 shadow-lg rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="text-lg label-text text-base-content">Email</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-base-content/70" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full pl-10 text-base"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="text-lg label-text text-base-content">Password</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-base-content/70" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pl-10 text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <button className="btn btn-primary w-full text-lg font-semibold">
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
                                        <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Login
                                    </>
                                )}
                            </button>

                            <p className="mt-8 text-center text-lg text-gray-400">
                                Not a member?{" "}
                                <Link
                                    to="/mentors/apply"
                                    className="text-lg text-primary hover:scale-50"
                                >
                                    Apply now <ArrowRight className="inline h-4 w-4" />
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default MentorLoginPage;

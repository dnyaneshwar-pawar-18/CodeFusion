import React, { useState } from "react";
import { motion } from "framer-motion";
import useForm from "../hooks/useForm";
import { Loader, Lock, LogIn, Mail, User, UserPlus } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const SignIn = () => {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });

    const { signin, loading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        signin(values);
    }

    return (
        <div className="min-h-screen flex flex-col items-center  bg-base-100 mt-16 px-4">
            <motion.div
                className="w-full max-w-md text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-primary text-3xl font-bold">Sign In</h2>
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
                                    value={values.email}
                                    onChange={handleChange}
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
                                    value={values.password}
                                    onChange={handleChange}
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
                                        Sign In
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;

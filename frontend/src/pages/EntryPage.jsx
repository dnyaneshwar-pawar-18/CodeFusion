import { User, UserCheck, UserPlus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EntryPage = () => {
    return (
        <div className="bg-gradient-to-t sm:bg-gradient-to-r from-primary to-secondary min-h-screen flex items-center justify-center ">
            <div className="text-center ">
                <div className='flex justify-center'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-primary w-24 h-24 flex items-center justify-center rounded-full shadow-lg mb-8"
                    >
                        <User size={50} className="text-base-100" />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-2xl sm:text-4xl font-bold text-base-100 mb-4">Welcome to Our Platform</h1>
                    <p className="text-lg sm:xl text-base-100 mb-8">Choose your role to get started</p>
                </motion.div>
                <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link to="/user/signin" className="btn btn-primary btn-lg text-primary-content   hover:bg-primary-focus">
                        <UserPlus className="mr-2" /> Enter as a User
                    </Link>
                    <Link to="/mentors/login" className="btn btn-secondary btn-lg text-secondary-content hover:bg-secondary-focus">
                        <UserCheck className="mr-2" /> Enter as a Mentor
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default EntryPage;


import { BookOpen, Briefcase, MessagesSquare, UserCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.1, rotate: 2, transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
};

const iconVariants = {
    initial: { y: 0 },
    animate: {
        y: [0, -8, 0],  // Bouncing effect
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const ModuleCards = () => {
    const { user } = useAuthStore();

    return (
        <div className="container mx-auto px-4">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }
                    }
                }}
            >
                {/* Q&A Card */}
                <motion.div variants={cardVariants} whileHover="hover" whileTap="tap"
                    className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md cursor-pointer w-full mt-5"
                >
                    <motion.div variants={iconVariants} initial="initial" animate="animate"
                        className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full"
                    >
                        <MessagesSquare size={32} />
                    </motion.div>
                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-bold text-primary">Q & A</h2>
                        <p className="pt-2 text-lg">"Got coding doubts? Join a thriving community and get expert answers instantly!"</p>
                    </div>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover" whileTap="tap"
                    className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md cursor-pointer w-full mt-5"
                >
                    <Link to="/resources" className="w-full h-full flex flex-col items-center">
                        <motion.div variants={iconVariants} initial="initial" animate="animate"
                            className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full"
                        >
                            <BookOpen size={32} />
                        </motion.div>
                        <div className="text-center mt-8">
                            <h2 className="text-2xl font-bold text-primary">Resources</h2>
                            <p className="pt-2 text-lg">"Access top learning materials, coding guides, and tools to boost your skills."</p>
                        </div>
                    </Link>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover" whileTap="tap"
                    className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md cursor-pointer w-full mt-5"
                >
                    <Link to="/mentors" className="w-full h-full flex flex-col items-center">
                        <motion.div variants={iconVariants} initial="initial" animate="animate"
                            className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full"
                        >
                            <UserCheck size={32} />
                        </motion.div>
                        <div className="text-center mt-8">
                            <h2 className="text-2xl font-bold text-primary">Mentor</h2>
                            <p className="pt-2 text-lg">"Connect with experienced developers for career advice and coding mentorship."</p>
                        </div>
                    </Link>
                </motion.div>

                {/* Jobs Card */}
                <motion.div variants={cardVariants} whileHover="hover" whileTap="tap"
                    className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md cursor-pointer w-full mt-5"
                >
                    <Link to={user ? '/jobs' : '/signin'} className="w-full h-full flex flex-col items-center">
                        <motion.div variants={iconVariants} initial="initial" animate="animate"
                            className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full"
                        >
                            <Briefcase size={32} />
                        </motion.div>
                        <div className="text-center mt-8">
                            <h2 className="text-2xl font-bold text-primary">Jobs</h2>
                            <p className="pt-2 text-lg">"Find your dream job with AI-powered job recommendations tailored to you."</p>
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ModuleCards;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MentorCard from "./MentorCard";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

const SubscribedMentors = () => {
    const { getMentors, subscribedMentors, loading } = useAuthStore();

    useEffect(() => {
        getMentors();
    }, [getMentors]);



    return (
        <div className="container mx-auto px-4 py-6 pt-20">
            <h2 className="text-2xl font-bold mb-4">Subscribed Mentors</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading mentors...</p>
            ) : subscribedMentors.length === 0 ? (
                <div className="min-h-screen flex flex-col mt-32 items-center bg-base-100">
                    <SearchX size={52} className="text-gray-500 mb-4" />
                    <p className="text-base-content text-xl">No Mentor Found</p>
                    <Link to="/mentors" className="btn btn-primary mt-4 text-lg">
                        Browse Other Mentors
                    </Link>
                </div>
            ) : (
                <motion.div className="min-h-screen"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {subscribedMentors.map((mentor) => (
                        <div key={mentor._id} to={`/mentors/${mentor.firstName.trim().toLowerCase()}-${mentor.lastName.trim().toLowerCase()}/${mentor._id}`}>
                            <MentorCard mentor={mentor} showApplyButton={false}/>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default SubscribedMentors;

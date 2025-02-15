import { BookOpen, Briefcase, MessageSquare, MessagesSquare, UserCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js'

const ModuleCards = () => {
    const { user } = useAuthStore();

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md hover:scale-105 transform duration-300 cursor-pointer w-full mt-5">
                    <div className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full">
                    <MessagesSquare size={32} />
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-bold text-primary">Q & A</h2>
                        <p className="pt-2 text-lg">"Got coding doubts? Join a thriving community and get expert answers instantly!"</p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md hover:scale-105 transform duration-300 cursor-pointer w-full mt-5">
                    <div className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full">
                        <BookOpen size={32} />
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-bold text-primary">Resources</h2>
                        <p className="pt-2 text-lg">"Access top learning materials, coding guides, and tools to boost your skills."</p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md hover:scale-105 transform duration-300 cursor-pointer w-full mt-5">
                    <div className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full">
                        <UserCheck size={32} />
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-bold text-primary">Mentor</h2>
                        <p className="pt-2 text-lg">"Connect with experienced developers for career advice and coding mentorship."</p>
                    </div>
                </div>

                <Link to={user ? '/jobs' : '/signin'} className="relative flex flex-col items-center bg-base-200 rounded-lg p-6 shadow-md hover:scale-105 transform duration-300 cursor-pointer w-full mt-5">
                    <div className="absolute -top-7 bg-base-300 text-base-content p-5 rounded-full">
                        <Briefcase size={32} />
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-bold text-primary">Jobs</h2>
                        <p className="pt-2 text-lg">"Find your dream job with AI-powered job recommendations tailored to you."</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ModuleCards;

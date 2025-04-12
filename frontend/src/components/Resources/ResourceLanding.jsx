import React from "react";
import resource_illustration from '../../assets/resource_illustration.webp'
import { Link } from "react-router-dom";

const ResourceLanding = () => {
    return (
            <div className="min-h-screen w-full sm:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16 -mt-20">
                <div className="text-center md:text-left max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
                        Explore the Best Coding Resources
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 animate-fade-in delay-100">
                        Find, share, and upvote high-quality coding tutorials, tools, and guides from top developers.
                    </p>
                    <Link to='/resources/explore' className="btn btn-lg btn-primary mt-6 animate-bounce">
                        Get Started
                    </Link>
                </div>

                <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
                    <img
                        src={resource_illustration}
                        alt="Illustration"
                        className="w-full max-w-xl animate-zoom-in rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>
    );
};

export default ResourceLanding;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMentorStore } from "../../store/useMentorStore";
import TypingEffect from './TypingEffect'
import MentorsList from "./MentorsList";
import { NavLink } from "react-router-dom";

const MentorsLanding = () => {
    const { fetchMentors, mentorsList } = useMentorStore();

    useEffect(() => {
        fetchMentors();
    }, [fetchMentors]);

    const domains = [
        { to: '/mentors/ai-ml', label: 'AI/ML' },
        { to: '/mentors/backend-developer', label: 'Backend Developer' },
        { to: '/mentors/full-stack-developer', label: 'Full Stack Developer' },
        { to: '/mentors/cyber-security', label: 'Cyber Security' },
        { to: '/mentors/product-manager', label: 'Product Manager' },
        { to: '/mentors/leadership', label: 'Leadership Mentors' },
        { to: '/mentors/marketing-coaches', label: 'Marketing Coaches' },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="py-10 px-4 rounded-lg w-full md:w-1/2 text-xl">
                <p>Learn a new skill, launch a project, land your dream career.</p>
                <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] leading-tight font-bold">
                    1-on-1
                    <span className="text-primary inline-block ml-3">{<TypingEffect />}</span>
                    <br />
                    Mentorship
                </h1>

                <div className="relative w-full max-w-lg mt-4">
                    <input
                        type="text"
                        placeholder="Search for mentors..."
                        className="w-full p-3 pr-12 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-sm shadow-md hover:bg-primary-dark transition-all">
                        Find Mentors
                    </button>
                </div>
                <div className="flex flex-wrap w-full sm:w-3/4 gap-2 mt-6">
                    {/* {[
                        "AI/ML",
                        "Backend Developer",
                        "Full Stack Developer",
                        "Cyber Security",
                        "Product Manager",
                        "Leadership Mentors",
                        "Marketing Coaches",
                    ].map((label, index) => (
                        <span
                            key={index}
                            className="bg-base-300 px-4 py-2 rounded-lg text-sm shadow-md"
                        >
                            {label}
                        </span>
                    ))} */}
                    {domains.map((domain) => (
                        <NavLink
                            key={domain.to}
                            to={domain.to}
                            className=
                                "text-lg px-5 py-3 rounded-lg transition-colors duration-300 font-semibold bg-base-200 hover:bg-base-300"
                                
                        >
                            {domain.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Animated Mentor List with Smooth Scrolling */}
            <div className="relative py-10 px-6 rounded-lg h-screen  mt-10 w-full md:w-1/3 text-xl overflow-hidden ">
                <MentorsList mentorsList={mentorsList} />
            </div>
        </div>
    );
};

export default MentorsLanding;













// import React, { useEffect } from 'react';
// import TypingEffect from './TypingEffect';
// import { useMentorStore } from '../../store/useMentorStore';

// const MentorsLanding = () => {
//     const { fetchMentors, mentorsList, mentor } = useMentorStore();
//     const skillsArray = mentorsList[0].skills[0].split(',').map(skill => skill.trim());


//     useEffect(() => {
//         fetchMentors();
//     }, [fetchMentors]);
//     return (
//         <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center gap-8">
//             <div className="py-10 px-4 rounded-lg w-full md:w-1/2 text-xl">
//                 <p>Learn a new skill, launch a project, land your dream career.</p>
//                 <h1 className='text-[3rem] md:text-[4rem] lg:text-[6rem] leading-tight font-bold'>
//                     1-on-1
//                     <span className="text-primary inline-block ml-3">
//                     </span>
//                     <br />Mentorship
//                 </h1>

//                 <div className="relative w-full max-w-lg mt-4">
//                     <input
//                         type="text"
//                         placeholder="Search for mentors..."
//                         className="w-full p-3 pr-12 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
//                     />
//                     <button
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-sm shadow-md hover:bg-primary-dark transition-all"
//                     >
//                         Find Mentors
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap w-full sm:w-3/4  gap-2 mt-6">
//                     {["AI/ML", "Backend Developer", "Full Stack Developer", "Cyber Security", "Product Manager", "Leadership Mentors", "Marketing Coaches"].map((label, index) => (
//                         <span key={index} className="bg-base-300 px-4 py-2 rounded-lg text-sm shadow-md">{label}</span>
//                     ))}
//                 </div>
//             </div>
//             <div className="py-10 px-6 rounded-lg w-full md:w-1/3 text-xl">
//                 <div className="w-full">
//                     {mentorsList.length > 0 && mentorsList.map((mentor, index) => {
//                         const skillsArray = mentor.skills ? mentor.skills[0].split(',').map(skill => skill.trim()) : [];

//                         return (
//                             <div key={index} className="p-5 bg-base-200 w-full md:w-3/4 rounded-lg shadow-md flex gap-10  cursor-pointer">
//                                 <img
//                                     src={mentor.profilePicture || "https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg"}
//                                     className="h-32 w-32 rounded-md object-cover"
//                                     alt={`${mentor.firstName} ${mentor.lastName}`}
//                                 />
//                                 <div className=''>
//                                     <h2 className="text-2xl font-bold">{mentor.firstName} {mentor.lastName}</h2>
//                                     <p className="text-md text-gray-700">{mentor.role} at {mentor.company}</p>
//                                     <ul className="flex flex-wrap gap-1 mt-3">
//                                         {skillsArray.map((skill, i) => (
//                                             <li key={i} className="text-xs font-medium bg-gray-600 text-white rounded-md px-2 py-1">
//                                                 {skill}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MentorsLanding;

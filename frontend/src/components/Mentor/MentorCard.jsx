import { Star } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';

const MentorCard = ({ mentor, showApplyButton }) => {
    const truncateString = (str, maxLength) => {
        if (str.length <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength) + '....';
    };

    const skillsArray = mentor?.skills ? mentor?.skills[0].split(",").map(skill => skill.trim()) : [];


    return (
        <div className='mt-10 bg-base-200 p-8 w-3/4 hover:shadow-lg transition-shadow duration-300 cursor-pointer border rounded-lg'>
            <Link to={`/mentors/${mentor.firstName.trim().toLowerCase()}-${mentor.lastName.trim().toLowerCase()}/${mentor._id}`}>
                <div className='flex flex-col sm:flex-row gap-5'>
                    <div className='h-80 w-72'>
                        <img src={mentor?.profileImg} className='h-full w-full object-cover rounded-md' />
                    </div>
                    <div className='relative w-full h-full'>
                        <div className='flex gap-4 items-center '>
                            <h1 className='text-3xl font-bold'>{mentor.firstName + " " + mentor.lastName}</h1>
                            <div className='bg-base-300 px-4 sm:py-3 sm:px-5 flex justify-center items-center rounded-full gap-3 border'>
                                <Star size={28} className='bg-primary text-primary-content rounded-full p-1' />
                                <h3 className='text-sm sm:text-xl font-semibold cursor-pointer'>Top Mentor</h3>
                            </div>
                        </div>

                        <p className='text-lg sm:text-2xl mt-2'>{mentor?.role} at @{mentor?.company}</p>
                        <div className="flex items-center text-yellow-500 mt-2">
                            <Star size={18} fill="currentColor" />
                            <Star size={18} fill="currentColor" />
                            <Star size={18} fill="currentColor" />
                            <Star size={18} fill="currentColor" />
                            <Star size={18} fill="currentColor" />
                            <span className="ml-2 text-base-content text-xl">5.0 (17 reviews)</span>
                        </div>

                        <p className="mt-4 text-xl w-full sm:w-[80%] text-base-content">{truncateString(mentor.bio, 160)}</p>

                        <div className="mt-6">
                            <a
                                href={mentor.inUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-blue-300 hover:underline cursor-pointer"
                            >
                                View LinkedIn Profile
                            </a>
                        </div>

                        <ul className="flex flex-wrap gap-1 sm:gap-2 mt-3">
                            {skillsArray.map((skill, i) => (
                                <li
                                    key={i}
                                    className="text-lg sm:text-xl border shadow hover:bg-base-300 transition-colors duration-300 cursor-pointer rounded-xl px-3 sm:px-4 py-2"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>

                        {
                            showApplyButton && (
                                <div className='flex items-center justify-end mr-20'>
                                    <Link to={`/mentors/subscribe/${mentor._id}`} className='btn btn-primary btn-lg mt-4 px-20 text-xl'>
                                        Apply Now
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MentorCard
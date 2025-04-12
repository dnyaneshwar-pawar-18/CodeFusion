import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMentorStore } from '../../store/useMentorStore';
import { ChevronRight, Clock8, House, Linkedin, MapPin, Star } from 'lucide-react';
import SubscribeCard from './SubscribeCard';

const MentorProfile = () => {
    const { _id: mentorId } = useParams();
    const [mentor, setMentor] = useState();
    const { getSpecificMentor } = useMentorStore();

    const skillsArray = mentor?.skills ? mentor?.skills[0].split(",").map(skill => skill.trim()) : [];

    useEffect(() => {
        const fetchMentorInfo = async () => {
            try {
                const mentor = await getSpecificMentor(mentorId);
                setMentor(mentor);
            } catch (error) {
                console.error('Error fetching mentor info:', error);
            }
        };
        if (mentorId) {
            fetchMentorInfo();
        }
    }, [mentorId]);

    function generateRandom() {
        return Math.floor(Math.random() * 1000 + 101);
    }

    return (
        <div className='min-h-screen bg-base-200 text-base-content p-4 pt-10'>
            <div className="relative w-full bg-base-200 h-auto pb-10">
                <div className='w-full lg:w-[80%] mx-auto p-4 sm:p-10'>
                    <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
                        <Link to='/mentors' className='shadow-md p-3 sm:p-4 rounded-full'>
                            <House size={28} className='text-primary' />
                        </Link>
                        <ChevronRight />
                        <Link to='/mentors' className='text-lg sm:text-xl font-semibold'>Find a Mentor</Link>
                        <ChevronRight />
                        <Link className='text-lg sm:text-xl font-semibold'>{mentor?.firstName + " " + mentor?.lastName}</Link>
                    </div>

                    <div className='mt-10 sm:mt-16 flex flex-col sm:flex-row items-center gap-8 sm:gap-16'>
                        <div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
                            <img src={mentor?.profileImg} className='h-40 w-40 sm:h-64 sm:w-64 object-cover rounded-full' />
                            <div className='bg-base-300 py-2 px-4 sm:py-3 sm:px-5 flex justify-center items-center rounded-full gap-3 hover:scale-105  duration-300'>
                                <Star size={28} className='bg-primary text-primary-content rounded-full p-1' />
                                <h3 className='text-lg sm:text-2xl font-semibold cursor-pointer'>Top Mentor</h3>
                            </div>
                        </div>
                        <div className='bg-base-300 p-3 rounded-lg hover:scale-110 cursor-pointer'>
                            <a href={mentor?.linkedInUrl} className='text-primary'>
                                <Linkedin size={28} />
                            </a>
                        </div>
                    </div>

                    <div className='w-full sm:w-3/4 p-4 sm:p-5'>
                        <h1 className='text-3xl sm:text-4xl font-bold'>{mentor?.firstName + " " + mentor?.lastName}</h1>
                        <p className='text-lg sm:text-2xl mt-2'>{mentor?.role} at @{mentor?.company}</p>

                        <div className='flex flex-col mt-6 space-y-3'>
                            <div className='flex items-center gap-4'>
                                <MapPin size={22} className='text-primary' />
                                <p className='text-lg sm:text-2xl'>{mentor?.location}</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <Star size={22} className='text-primary' />
                                <p className='text-lg sm:text-2xl'>5.0 ({generateRandom()} reviews)</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <Clock8 size={22} className='text-primary' />
                                <p className='text-lg sm:text-2xl'>Active Today</p>
                            </div>
                        </div>

                        <div>
                            <hr className="mt-5 h-1 bg-base-300" />
                            <div className='p-4 sm:p-5'>
                                <h1 className='text-xl sm:text-2xl font-bold'>About</h1>
                                <p className='mt-3 text-lg sm:text-xl'>{mentor?.bio}</p>
                            </div>
                        </div>

                        <div className='mb-10'>
                            <hr className="mt-5 h-1 bg-base-300" />
                            <div className='p-4 sm:p-5'>
                                <h1 className='text-xl sm:text-2xl font-bold'>Skills</h1>
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    {
                        <SubscribeCard mentor={mentor} />
                    }
                </div>
            </div>
        </div>
    );
};

export default MentorProfile;









// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { useMentorStore } from '../../store/useMentorStore';
// import { ChevronRight, Clock8, House, Linkedin, MapPin, Star } from 'lucide-react'

// const MentorProfile = () => {
//     const { _id: mentorId } = useParams();
//     const [mentor, setMentor] = useState();
//     const { getSpecificMentor } = useMentorStore();

//     const skillsArray = mentor?.skills
//         ? mentor?.skills[0].split(",").map((skill) => skill.trim())
//         : [];


//     useEffect(() => {
//         const fetchMentorInfo = async () => {
//             try {
//                 const mentor = await getSpecificMentor(mentorId);
//                 setMentor(mentor);
//             } catch (error) {
//                 console.error('Error fetching mentor info:', error);
//             }
//         }
//         if (mentorId) {
//             fetchMentorInfo();
//         }
//     }, [mentorId])

//     function generateRandom() {
//         return Math.floor(Math.random() * 1000 + 101);
//     }


//     return (
//         <div className='min-h-screen text-base-content p-4 pt-10'>
//             <div className="bg-base-200 h-[350px]">
//                 <div className='w-full sm:w-[80%] mx-auto p-10'>
//                     <div className='flex items-center gap-6'>
//                         <Link to='/mentors' className='shadow-md p-4 inline-block rounded-full'>
//                             <House size={32} className='text-primary' />
//                         </Link>

//                         <ChevronRight />

//                         <Link className='text-xl font-semibold'>
//                             Find a Mentor
//                         </Link>

//                         <ChevronRight />

//                         <Link className='text-xl font-semibold'>{mentor?.firstName + " " + mentor?.lastName}</Link>
//                     </div>

//                     <div className='mt-16 flex items-center gap-16  '>
//                         <div className='flex justify-between items-center w-full sm:w-1/2'>
//                             <div className='flex justify-center items-center gap-8'>
//                                 <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Light-Yagami-from-Death-Note-evil-laughter.jpg" className='h-64 w-64 object-cover rounded-full' />

//                                 <div className='bg-base-300 py-3 px-5 flex justify-center items-center rounded-full gap-4'>
//                                     <Star size={32} className='bg-primary text-primary-content rounded-full p-1' />
//                                     <h3 className='text-2xl font-semibold cursor-pointer'>Top Mentor</h3>
//                                 </div>
//                             </div>
//                             <div>
//                                 <a href={mentor?.linkedInUrl} className='text-primary'>
//                                     <Linkedin />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='w-full sm:w-3/4  p-5 ml-3'>
//                         <h1 className='text-4xl font-bold'>{mentor?.firstName + " " + mentor?.lastName}</h1>

//                         <p className="text-2xl mt-2">
//                             {mentor?.role} at @{mentor?.company}
//                         </p>

//                         <div className='flex flex-col mt-6 space-y-3'>
//                             <div className='flex items-center gap-4'>
//                                 <MapPin size={24} className='text-primary' />
//                                 <p className='text-2xl'>{mentor?.location}</p>
//                             </div>

//                             <div className='flex items-center gap-4'>
//                                 <Star size={24} className='text-primary' />
//                                 <p className='text-2xl'>5.0 ({generateRandom()} reviews)</p>
//                             </div>
//                             <div className='flex items-center gap-4'>
//                                 <Clock8 size={24} className='text-primary' />
//                                 <p className='text-2xl'>Active Today</p>
//                             </div>
//                         </div>

//                         <div>
//                             <hr className=" mt-5 h-1 bg-base-300" />

//                             <div className='p-5'>
//                                 <h1 className='text-2xl font-bold'>About</h1>
//                                 <p className='mt-4 text-xl w-full'>{mentor?.bio}</p>
//                             </div>
//                         </div>

//                         <div className='mb-10'>
//                             <hr className=" mt-5 h-1 bg-base-300" />
//                             <div className='p-5'>
//                                 <h1 className='text-2xl font-bold'>Skills</h1>
//                                 <ul className="flex flex-wrap gap-1 mt-3">
//                                     {skillsArray.map((skill, i) => (
//                                         <li
//                                             key={i}
//                                             className="text-xl bg-base-200 hover:bg-base-300 transition-colors duration-300 cursor-pointer rounded-xl px-4 py-2"
//                                         >
//                                             {skill}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MentorProfile

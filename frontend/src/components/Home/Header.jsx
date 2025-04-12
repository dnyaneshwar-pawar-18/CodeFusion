// import React from 'react';
// import ModuleCards from '../common/ModuleCards';

// const Header = () => {
//     return (
//         <div className='bg-base-100 min-h-screen px-4 sm:px-10'>
//             <div className='w-full sm:w-3/4 flex flex-col sm:flex-row justify-between items-center mx-auto pt-20 gap-10 sm:gap-20'>
//                 <div className='text-black text-center sm:text-left py-2 px-4 '>
//                     <h1 className='text-5xl text-left sm:text-7xl font-bold text-base-content'>
//                         Welcome to <i className='text-primary'>CodeFusion!</i>
//                     </h1>
//                     <p className='mt-5 text-lg sm:text-2xl text-base-content text-justify'>
//                         Welcome to <i>CodeFusion</i>, your one-stop platform for job recommendations, mentorship, and career resources. Get personalized job matches, expert guidance, and the best opportunities to grow your career. Start exploring today!
//                     </p>
//                 </div>

//                 <div className='w-full flex justify-center items-center'>
//                     <img 
//                         src="https://cdni.iconscout.com/illustration/premium/thumb/it-services-illustration-download-in-svg-png-gif-file-formats--video-call-live-chat-conference-isometric-pack-business-illustrations-3804447.png?f=webp" 
//                         alt="CodeFusion Illustration" 
//                         // className="max-w-[80%] sm:w-full h-auto"
//                     />
//                 </div>
//             </div>

//             <div className='mt-28'>
//                 <ModuleCards />
//             </div>
//         </div>
//     );
// };

// export default Header;



import React from "react";
import { motion } from "framer-motion";
import ModuleCards from "../common/ModuleCards";

const Header = () => {
    return (
        <div className="bg-base-100 min-h-screen px-4 sm:px-10">
            <div className="w-full sm:w-3/4 flex flex-col sm:flex-row justify-between items-center mx-auto pt-20 gap-10 sm:gap-20">
                {/* Animated Text Section */}
                <motion.div 
                    className="text-black text-center sm:text-left py-2 px-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-5xl text-left sm:text-7xl font-bold text-base-content">
                        Welcome to <i className="text-primary">CodeFusion!</i>
                    </h1>
                    <p className="mt-5 text-lg sm:text-2xl text-base-content text-justify">
                        <i>CodeFusion</i> is your all-in-one platform for career advancement! Get personalized job recommendations, connect with industry experts, and access premium learning resources to accelerate your growth.
                    </p>
                </motion.div>

                {/* Animated Image Section */}
                <motion.div
                    className="w-full flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                >
                    <img 
                        src="https://cdni.iconscout.com/illustration/premium/thumb/it-services-illustration-download-in-svg-png-gif-file-formats--video-call-live-chat-conference-isometric-pack-business-illustrations-3804447.png?f=webp" 
                        alt="CodeFusion Illustration"
                        className="max-w-[80%] sm:w-full h-auto"
                    />
                </motion.div>
            </div>

            {/* Module Cards with Smooth Entry Animation */}
            <motion.div 
                className="mt-28"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
                <ModuleCards />
            </motion.div>
        </div>
    );
};

export default Header;

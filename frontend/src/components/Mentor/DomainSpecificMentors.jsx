// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useMentorStore } from "../../store/useMentorStore";
// import MentorCard from "./MentorCard";
// import { SearchX } from "lucide-react";

// const DomainSpecificMentors = () => {
//     const { domain } = useParams();
//     const [mentors, setMentors] = useState([]);
//     const { getDomainSpecificMentors, loading } = useMentorStore();

//     useEffect(() => {
//         const fetchDomainSpecificMentors = async () => {
//             try {
//                 const data = await getDomainSpecificMentors(domain);
//                 setMentors(data);
//             } catch (error) {
//                 console.error("Error fetching mentor info:", error);
//             }
//         };

//         if (domain) {
//             fetchDomainSpecificMentors();
//         }
//     }, [domain, getDomainSpecificMentors]);

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h2 className="text-2xl font-bold mb-4">Mentors in {domain}</h2>

//             {loading ? (
//                 <p className="text-center text-gray-500">Loading mentors...</p>
//             ) : mentors.length === 0 ? (
//                 <div className="min-h-screen flex flex-col mt-32 items-center bg-base-100">
//                     <SearchX size={52} className="text-gray-500 mb-4" />
//                     <p className="text-base-content text-xl">No Mentor Found</p>
//                     <Link to="/mentors" className="btn btn-primary mt-4 text-lg">
//                         Browse Other Mentors
//                     </Link>
//                 </div>
//             ) : (
//                 // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
//                 <div className="min-h-screen">
//                     {mentors.map((mentor) => (
//                         <Link to={`/mentors/${mentor.firstName.trim().toLowerCase()}-${mentor.lastName.trim().toLowerCase()}/${mentor._id}`}>
//                             <MentorCard key={mentor.id} mentor={mentor} />
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DomainSpecificMentors;



import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMentorStore } from "../../store/useMentorStore";
import MentorCard from "./MentorCard";
import { Loader, SearchX } from "lucide-react";
import { motion } from "framer-motion";

const DomainSpecificMentors = () => {
    const { domain } = useParams();
    const [mentors, setMentors] = useState([]);
    const [error, setError] = useState(null);  // New error state
    const { getDomainSpecificMentors, loading } = useMentorStore();

    useEffect(() => {
        const fetchDomainSpecificMentors = async () => {
            try {
                setError(null); // Reset error before fetching
                const data = await getDomainSpecificMentors(domain);

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received");
                }

                setMentors(data);
            } catch (error) {
                console.error("Error fetching mentor info:", error);
                setError("Failed to fetch mentors. Please try again.");
                setMentors([]); // Ensure it's always an array
            }
        };

        if (domain) {
            fetchDomainSpecificMentors();
        }
    }, [domain, getDomainSpecificMentors]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Mentors in {domain}</h2>

            {loading ? (
                <div className="min-h-screen">
                    <Loader size={32}/>
                </div>
            ) : mentors.length === 0 ? (
                <div className="min-h-screen flex flex-col mt-32 items-center bg-base-100">
                    <SearchX size={52} className="text-gray-500 mb-4" />
                    <p className="text-base-content text-xl">No Mentor Found</p>
                    <Link to="/mentors" className="btn btn-primary mt-4 text-lg">
                        Browse Other Mentors
                    </Link>
                </div>
            ) : (
                // <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div className="min-h-screen"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {mentors.map((mentor) => (
                        <div key={mentor._id}>
                            <MentorCard mentor={mentor} showApplyButton={true} />
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default DomainSpecificMentors;

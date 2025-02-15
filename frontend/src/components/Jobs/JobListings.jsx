import React, { useState } from 'react'
import { motion } from 'framer-motion';
import JobCard from './JobCard';
import useFilteredData from '../hooks/useFilteredData';
import { useJobStore } from '../../store/useJobStore';

const JobListings = () => {
  const { loading } = useJobStore();
    const [searchQuery, setSearchQuery] = useState('');

    const { filteredJobsData } = useFilteredData(searchQuery);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.5,
                ease: 'easeOut',
            },
        }),
    }; 

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-4">
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered w-full max-w-sm bg-base-300 text-base-content"
      />
    </div>
  
    <div className="mt-6 w-full sm:w-[80%] mx-auto">
      <h1 className="text-3xl font-bold text-center">Jobs</h1>
  
      {loading ? (
        <div className="flex justify-center items-center mt-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredJobsData.map((job, index) => (
            <motion.div
              key={job.id}
              className="card w-full hover:scale-105"
              custom={index}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
  
  )
}

export default JobListings
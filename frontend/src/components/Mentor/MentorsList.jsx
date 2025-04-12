import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MentorsList = ({ mentorsList }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [yValue, setYValue] = useState(0); // Track current position

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setYValue((prev) => (prev - 1) % -100); // Scroll smoothly
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <motion.div
      className="flex flex-col space-y-6"
      animate={{ y: `${yValue}%` }}
      transition={{
        duration: 0.1, // Instant effect for smooth transition
        ease: "linear",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {mentorsList.map((mentor, index) => {
        const skillsArray = mentor.skills
          ? mentor.skills[0].split(",").map((skill) => skill.trim())
          : [];

        // const name = mentor.firstName + mentor.lastName.toString().to

        return (
          <Link
            to={`/mentors/${mentor.firstName.trim().toLowerCase()}-${mentor.lastName.trim().toLowerCase()}/${mentor._id}`}
            key={index}
            className="p-5 w-full rounded-lg border border-base-300 flex gap-10 cursor-pointer"
          >
            <img
              src={
                mentor?.profileImg ||
                "https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg"
              }
              className="h-32 w-32 rounded-md object-cover"
              alt={`${mentor.firstName} ${mentor.lastName}`}
            />
            <div>
              <h2 className="text-2xl font-bold">
                {mentor.firstName} {mentor.lastName}
              </h2>
              <p className="text-md">
                {mentor.role} at {mentor.company}
              </p>
              <ul className="flex flex-wrap gap-1 mt-3">
                {skillsArray.map((skill, i) => (
                  <li
                    key={i}
                    className="text-xs font-medium bg-gray-600 text-white rounded-md px-2 py-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default MentorsList;

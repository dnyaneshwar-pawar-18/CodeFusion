import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMentorStore } from "../../store/useMentorStore";

const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    goal: "",
    message: "",
  });

  const { subscribeMentor } = useMentorStore();
  const { _id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)
    subscribeMentor(formData, _id);
    setFormData({ role: "", goal: "", message: ""})
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-base-200">
      <motion.div
        className="w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Subscribe to Mentor</h2>
          <p className="mt-2 text-sm text-base-content">
            Fill out the details to connect with your mentor.
          </p>
        </div>
        <div className="card w-full shadow-lg bg-base-100 p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-lg">Role</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Web Developer, Data Analyst"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-lg">Goal</span>
              </label>
              <input
                type="text"
                placeholder="What do you want to achieve?"
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-lg">Message</span>
              </label>
              <textarea
                placeholder="Write your message to the mentor"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows="4"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscribeForm;

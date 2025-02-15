import React from "react";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    // Format the posted date
    const postedDate = new Date(job.date_posted).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // Safely access regions and countries, defaulting to empty arrays if null or undefined
    const regions = Array.isArray(job.regions_derived) ? job.regions_derived : [];
    const countries = Array.isArray(job.countries_derived) ? job.countries_derived : [];

    return (
        <div>
            <Link
                to={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card w-full max-w-md md:max-w-lg bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:scale-105 transition-transform"
            >
                <div className="card-body p-4">
                    <h2 className="card-title text-primary">{job.title}</h2>
                    <p className="text-base-content">{job.organization}</p>

                    <div className="flex items-center text-sm text-base-content">
                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                        <span>{regions.join(", ")}, {countries.join(", ")}</span>
                    </div>

                    <div className="flex items-center text-sm text-base-content">
                        <Calendar className="w-4 h-4 mr-1 text-primary" />
                        <span>Posted on {postedDate}</span>
                    </div>

                    <div className="text-sm text-base-content">
                        <span className="font-semibold">Employment Type:</span> {job.employment_type.join(", ")}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default JobCard;

// import fetch from 'node-fetch';

// const url = 'https://jobs-search-api.p.rapidapi.com/search';
// const options = {
//     method: 'POST',
//     headers: {
//         'x-rapidapi-key': '0565e2cc1emshb943ef4eff3c5cfp1c6d9ejsn64c98b3b0416',
//         'x-rapidapi-host': 'jobs-search-api.p.rapidapi.com',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         search_term: 'web',
//         location: 'mumbai',
//         results_wanted: 10,
//         site_name: ['indeed', 'linkedin', 'zip_recruiter', 'glassdoor'],
//         distance: 50,
//         job_type: 'fulltime',
//         is_remote: false,
//         linkedin_fetch_description: false,
//         hours_old: 72,
//     }),
// };

// export const fetchJobData = async (req, res) => {
//     try {
//         const response = await fetch(url, options);
//         console.log('herex...')
//         if (!response.ok) {
//             return res.status(500).json({ message: 'Failed to fetch jobs', status: false });
//         }

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message, status: false });
//     }
// };


//! LinkedIn Job Api

// const url = 'https://linkedin-jobs-api2.p.rapidapi.com/active-jb-24h?title_filter=%22Data%20Engineer%22&location_filter=%22United%20States%22';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '0565e2cc1emshb943ef4eff3c5cfp1c6d9ejsn64c98b3b0416',
// 		'x-rapidapi-host': 'linkedin-jobs-api2.p.rapidapi.com'
// 	}
// };

// export const fetchJobData = async (req, res) => {
//     try {
//         const response = await fetch(url, options);
//         console.log('herex...')
//         if (!response.ok) {
//             return res.status(500).json({ message: 'Failed to fetch jobs', status: false });
//         }

//         const data = await response.json();
//         console.log(data);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message, status: false });
//     }
// };



import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JobPreference from '../models/job.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobDataPath = path.resolve(__dirname, '../data/linkedInData.json');

export const fetchJobData = async (req, res) => {
    try {
        const data = fs.readFileSync(jobDataPath, 'utf-8');
        const jobs = JSON.parse(data);
        // console.log(jobs);
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching job data:', error);
        res.status(500).json({ message: error.message, status: false });
    }
};

export const handleJobPreferenceData = async (req, res) => {
    try {
        const { 
            fullName, 
            currentLocation, 
            contactNumber, 
            skills, 
            experienceLevel, 
            preferredRoles, 
            jobType, 
            preferredLocation, 
            expectedSalary 
        } = req.body;
        
        if (!fullName || !contactNumber || !skills || !experienceLevel) {
            return res.status(400).json({ message: 'Full Name, Contact Number, Skills, and Experience Level are required.' });
        }
        console.log('here... in jobPref')
        const userId = req.user._id;
        const data = await JobPreference.create({
            userId,
            ...req.body, 
        });

        console.log(data);

        res.status(201).json({ message: "Data saved successfully", data });
    } catch (error) {
        console.error(error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getJobPreferenceData = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const jobPreferences = await JobPreference.findOne({ userId });
        if (!jobPreferences) {
            return res.status(404).json({ message: "Job preferences not found for this user." });
        }
        console.log('here..')
        res.status(200).json(jobPreferences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while retrieving job preferences." });
    }
}

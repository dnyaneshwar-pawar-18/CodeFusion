import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useJobStore = create((set, get) => ({
    jobsData: [],
    jobPreferenceData: [],
    loading: false,

    fetchJobsData: async () => {
        set({ loading: true });

        try {
            const response = await axiosInstance.get('/jobs');
            console.log(response);
            set({ jobsData: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error('Error fetching jobs data:', error);
            toast.error('An error occurred while fetching jobs data');
        }
    },

    jobPreference: async (data) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/jobs/jobPreference', data);
            console.log(response);
            toast.success('Data saved Successfully');
            set({ loading: false })
        } catch (error) {
            set({ loading: false });
            console.error('Error while saving :', error);
            toast.error('An error occurred. Please make sure the data is correct');
        }
    },

    fetchPreferenceData: async (userId) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/jobs/getJobPreferenceData/${userId}`);
            console.log(response);
            set({ jobPreferenceData: response.data });
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
            console.error('Error while fetching :', error);
            toast.error('An error occurred while fetching job preference data');
        }
    }

}));
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useMentorStore = create((set, get) => ({
    mentor: null,
    mentorsList: [],
    loading: false,
    isCheckingMentorAuth: true,

    apply: async (data) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/mentor/apply', data);
            const mentorData = response.data;
            set({ mentor: mentorData, loading: false });
            toast.success("Mentor created successfully!");
        } catch (error) {
            set({ loading: false });

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || "Error while creating a mentor";
                toast.error(errorMessage);
            } else {
                toast.error("Error while creating a mentor");
            }
        }
    },


    loginMentor: async (data) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/mentor/login', data);
            set({ mentor: response.data, loading: false });
            toast.success(`Welcome back, ${response.data.firstName}!`);
        } catch (error) {
            set({ loading: false });
            console.error("Login Error:", error.message);

            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        }
    },

    logoutMentor: async () => {
        try {
            await axiosInstance.post('/mentor/logout');
            set({ mentor: null })
        } catch (error) {
            toast.error(error.response.data.message || 'An error occured');
        }
    },

    checkMentorAuth: async () => {
        try {
            const response = await axiosInstance.get('/mentor/checkMentorAuth');
            const mentorData = response.data;

            if (mentorData) {
                console.log("MentorData:", mentorData);
                set({ mentor: mentorData, loading: false });
            }
        } catch (error) {
            console.log('Error in checkMentorAuth:', error);
            set({ mentor: null });
        } finally {
            set({ isCheckingMentorAuth: false });
        }
    },


    fetchMentors: async () => {
        try {
            const response = await axiosInstance.get('/mentor/fetchMentors');
            // console.log('In mentor store ', response);
            set({ mentorsList: response.data });
        } catch (error) {
            toast.error(error.message)
        }
    },

    getSpecificMentor: async (_id) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/mentor/specificMentor/${_id}`);
            console.log('specificData:', response.data);

            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ loading: false });
            toast.error(error.message || 'An error occurred');
            throw error;
        }
    },

    subscribeMentor: async (data, _id) => {
        set({ loading: true });
        try {
            console.log('data: ', data)
            const response = await axiosInstance.post(`/auth/subscribe/${_id}`, data);
            set({ loading: false });
            toast.success(response.data.message);
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || 'An error occurred');
            throw error;
        }
    },

    editProfile: async (data, _id) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.patch(`/mentor/profile/${_id}/edit`, data);
            set({ loading: false })
            toast.success(response.data.message)

        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || 'An error occurred');
        }
    },

    getDomainSpecificMentors: async (domain) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/mentor/doamin-specific-mentor/${domain}`);
            console.log(response.data)
            set({ loading: false })

            return response.data;
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || 'An error occurred');
        }
    },


}));

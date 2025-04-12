import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,
    isCheckingAuth: true,
    subscribedMentors: [],
    subscribedMentees: [],

    signup: async (data) => {
        set({ loading: true })

        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ user: res.data, loading: false })
            toast.success('Account created successfully')
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || 'An error occured');
        }
    },

    signin: async (data) => {
        set({ loading: true });
        console.log(data)
        try {
            const res = await axiosInstance.post('/auth/login', data);
            console.log(res)
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || 'An error occurred');
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            set({ user: null })
        } catch (error) {
            toast.error(error.response.data.message || 'An error occured');
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const response = await axiosInstance.get('/auth/checkAuth');
            set({ user: response.data, isCheckingAuth: false });
        } catch (error) {
            console.log(error.message);
            set({ user: null, isCheckingAuth: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    getMentors: async () => {
        set({ loading: true });
        try {
            console.log('here in getments store ')
            const response = await axiosInstance.get('/auth/getMentors');
            console.log(response.data);
            set({
                subscribedMentors: response.data, // Update with fetched mentors
                loading: false, // Reset loading state
            });
        } catch (error) {
            console.log("Error fetching mentors: ", error.message);
            set({
                subscribedMentors: [], // Reset mentors on error
                loading: false, // Reset loading state
            });
        }
    },



    getMentees: async () => {
        set({ loading: true }); // Set loading state to true
        try {
            const response = await axiosInstance.get('/auth/getMentees');
            console.log(response.data);

            set({
                subscribedMentees: response.data.mentees,
                loading: false, // Reset loading state
            });
        } catch (error) {
            console.error("Error fetching mentees:", error.message); // Log error for debugging
            set({
                subscribedMentees: [], // Reset mentees on error
                loading: false, // Reset loading state
            });
        }
    },

}))
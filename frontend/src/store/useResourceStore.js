import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js';

export const useResourceStore = create((set, get) => ({
    resources: [],
    error: null,
    loading: false,

    createResource: async (data) => {
        console.log("Creating resource...", data);
        set((state) => ({ ...state, loading: true, error: null }));

        try {
            const response = await axiosInstance.post("/resource/create", data, {
                headers: { "Content-Type": "application/json" },
            });

            set((state) => ({
                ...state,
                loading: false,
                resources: [response.data, ...state.resources], // Add new resource at the beginning
            }));

            console.log(response)

            return response; // Return the newly created resource
        } catch (error) {
            console.error("Error creating resource:", error);

            const errorMessage = error.response?.data?.message || "Failed to create resource";

            set((state) => ({
                ...state,
                loading: false,
                error: errorMessage,
            }));

            return { error: errorMessage }; // Return the error so components can handle it
        }
    },


    fetchResources: async () => {
        set({ loading: true, error: null, resources: [] });
        try {
            const response = await axiosInstance.get('/resource/fetchResources');
            console.log('Resources fetched successfully:', response.data);

            set({ loading: false, resources: response.data });
        } catch (error) {
            console.error('Error fetching resources:', error);
            set({ loading: false, error: error.response?.data?.message || "Failed to fetch resources" });
        }
    },

    upvoteResource: async (id) => {
        try {
            const response = await axiosInstance.patch(`/resource/upvote/${id}`);
    
            set((state) => ({
                resources: state.resources.map((res) =>
                    res._id === id
                        ? { 
                            ...res, 
                            upvotes: response.data.upvotes, 
                            downvotes: response.data.downvotes,  // ✅ Ensure downvotes update
                            upvotedBy: response.data.upvotedBy, 
                            downvotedBy: response.data.downvotedBy 
                          }
                        : res
                ),
            }));
        } catch (error) {
            console.error("Upvote error:", error.response?.data?.message || error);
        }
    },
    
    downvoteResource: async (id) => {
        try {
            const response = await axiosInstance.patch(`/resource/downvote/${id}`);
    
            set((state) => ({
                resources: state.resources.map((res) =>
                    res._id === id
                        ? { 
                            ...res, 
                            upvotes: response.data.upvotes,  // ✅ Ensure upvotes update
                            downvotes: response.data.downvotes, 
                            upvotedBy: response.data.upvotedBy, 
                            downvotedBy: response.data.downvotedBy 
                          }
                        : res
                ),
            }));
        } catch (error) {
            console.error("Downvote error:", error.response?.data?.message || error);
        }
    },
    


}));

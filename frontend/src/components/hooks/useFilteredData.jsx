import { useEffect } from 'react';
import { useJobStore } from '../../store/useJobStore';

const useFilteredData = (searchQuery) => {
    const { fetchJobsData, jobsData, loading } = useJobStore();

    useEffect(() => {
        fetchJobsData();
    }, [fetchJobsData]);


    const filteredJobsData = jobsData.filter((job) => {
        const titleMatch = job.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const regionMatch = Array.isArray(job.regions_derived) &&
            job.regions_derived.some(region => {
                if (typeof region !== 'string') {
                    console.log('Skipping invalid region:', region);
                    return false;
                }
                return region.toLowerCase().includes(searchQuery.toLowerCase());
            });

        return titleMatch || regionMatch;
    });

    return { filteredJobsData, loading };
};

export default useFilteredData;

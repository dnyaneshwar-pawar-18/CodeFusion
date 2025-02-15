import React from 'react'
import JobsLanding from '../components/Jobs/JobsLanding'
import { Route, Routes } from 'react-router-dom'
import PreferenceForm from '../components/Jobs/PreferenceForm'
import { useAuthStore } from '../store/useAuthStore.js'
import JobListings from '../components/Jobs/JobListings.jsx'

const JobsPage = () => {
  const { user } = useAuthStore();
  return (
    <div className='min-h-screen'>


      <Routes>
        <Route path='/' element={<JobsLanding user={user} />} />
        <Route path='/preference-form' element={<PreferenceForm />} />
        <Route path='/listings' element={<JobListings />} />
      </Routes>
    </div>
  )
}

export default JobsPage
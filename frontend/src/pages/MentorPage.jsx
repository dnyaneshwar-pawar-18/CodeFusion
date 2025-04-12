import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MentorsNav from '../components/Mentor/MentorsNav'
import MentorsLanding from '../components/Mentor/MentorsLanding'
import MentorProfile from '../components/Mentor/MentorProfile'
import DomainSpecificMentors from '../components/Mentor/DomainSpecificMentors'
import SubscribeForm from '../components/Mentor/SubscribeForm'
import SubscribedMentors from '../components/Mentor/SubscribedMentors'

const MentorPage = () => {
  return (
    <div>
      <MentorsNav />

        <Routes>
          <Route path='/' element={<MentorsLanding />} />
          <Route path='/:name/:_id' element={<MentorProfile />} />
          <Route path='/:domain' element={<DomainSpecificMentors />} />
          <Route path='/subscribe/:_id' element={<SubscribeForm />} />
          <Route path='/subscribed-mentors' element={<SubscribedMentors />} />
        </Routes>
      </div>
  )
}

export default MentorPage
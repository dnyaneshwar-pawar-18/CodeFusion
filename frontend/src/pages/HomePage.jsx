import React from 'react';
import Header from '../components/Home/Header';
import QA from '../components/Home/QA';
import Resources from '../components/Home/Resources';
import Mentor from '../components/Home/Mentor';
import Job from '../components/Home/Job';
import Footer from '../components/Home/Footer';
import { useAuthStore } from '../store/useAuthStore';
import EntryPage from './EntryPage';
import { useMentorStore } from '../store/useMentorStore';

const HomePage = () => {
  const { user } = useAuthStore();
  const { mentor } = useMentorStore();
  console.log('mentor in homepaeg', mentor)
  return (
    <div className="bg-base-100">
      {user || mentor ? (
        <>
          <Header />
          <QA />
          <Resources />
          <Mentor />
          <Job />
        </>
      ) : (
        <EntryPage />
      )}

    </div>
  );
};

export default HomePage;

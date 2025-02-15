import React from 'react';
import Header from '../components/Home/Header';
import QA from '../components/Home/QA';
import Resources from '../components/Home/Resources';
import Mentor from '../components/Home/Mentor';
import Job from '../components/Home/Job';
import Footer from '../components/Home/Footer';

const HomePage = () => {
  return (
    <div className="bg-base-100">
      <Header />
      <QA />
      <Resources />
      <Mentor />
      <Job />
      <Footer />
    </div>
  );
};

export default HomePage;

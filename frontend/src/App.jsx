import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ThemesPage from './pages/ThemesPage';
import Navbar from './components/common/Navbar';
import { useThemeStore } from './store/useThemeStore';
import UserSignUpPage from './pages/UserSignUpPage';
import UserSignInPage from './pages/UserSignInPage';
import { useAuthStore } from './store/useAuthStore';
import JobsPage from './pages/JobsPage';
import MentorApplyPage from './pages/MentorApplyPage';
import MentorLoginPage from './pages/MentorLoginPage';
import { useMentorStore } from './store/useMentorStore';
import Footer from './components/Home/Footer';
import { Toaster } from 'react-hot-toast';
import MentorPage from './pages/MentorPage';
import ResourcePage from './pages/ResourcePage';


const App = () => {
  const { user, checkAuth } = useAuthStore();
  const { mentor, checkMentorAuth } = useMentorStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (checkAuth ) checkAuth?.();
    if (checkMentorAuth) checkMentorAuth?.();
  }, [checkAuth, checkMentorAuth]);


  return (
    <div data-theme={theme} className='max-w-full'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/themes' element={<ThemesPage />} />

        <Route path='/user/signup' element={!user ? <UserSignUpPage /> : <Navigate to='/' />} />
        <Route path='/user/signin' element={!user ? <UserSignInPage /> : <Navigate to='/' />} />

        <Route path='/mentors/apply' element={!mentor ? <MentorApplyPage /> : <Navigate to='/' />} />
        <Route path='/mentors/login' element={!mentor ? <MentorLoginPage /> : <Navigate to='/' />} />

        <Route path='/jobs/*' element={<JobsPage />} />

        <Route path='/mentors/*' element={<MentorPage />} />

        <Route path='/resources/*' element={<ResourcePage />} />
      </Routes>

      {(user?._id || mentor?._id ) && <Footer />}

      <Toaster />
    </div>
  );
};

export default App;



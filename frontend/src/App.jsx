import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ThemesPage from './pages/ThemesPage'
import Navbar from './components/common/Navbar'
import { useThemeStore } from './store/useThemeStore'
import UserSignUpPage from './pages/UserSignUpPage'
import UserSignInPage from './pages/UserSignInPage'
import { useAuthStore } from './store/useAuthStore'
import JobsPage from './pages/JobsPage'

const App = () => {
  const { user, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  return (
    <div data-theme={theme} className='max-w-full'>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/themes' element={<ThemesPage />} />
          <Route path='/signup' element={!user ? <UserSignUpPage />  : <Navigate to='/' />}/>
          <Route path='/signin' element={!user ? <UserSignInPage />  : <Navigate to='/' />} />

          {/* Jobs */}
          <Route path='/jobs/*' element={<JobsPage />} />
        </Routes>
      </div>
  )
}

export default App
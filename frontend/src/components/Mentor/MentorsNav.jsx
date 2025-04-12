import React from 'react';
import { NavLink } from 'react-router-dom';

const MentorsNav = () => {
  const domains = [
    { to: '/mentors/ai-ml', label: 'AI/ML' },
    { to: '/mentors/backend-developer', label: 'Backend Developer' },
    { to: '/mentors/full-stack-developer', label: 'Full Stack Developer' },
    { to: '/mentors/cyber-security', label: 'Cyber Security' },
    { to: '/mentors/product-manager', label: 'Product Manager' },
    { to: '/mentors/leadership', label: 'Leadership Mentors' },
    { to: '/mentors/marketing-coaches', label: 'Marketing Coaches' },
  ];

  return (
    <div className='bg-base-100 w-full fixed top-30 left-0 z-20 shadow-md'>
      {/* <div className='bg-base-100 w-full shadow-md'> */}
      <div className='w-full sm:w-[80%] mx-auto'>
        <div className='flex flex-wrap gap-4 sm:gap-8 py-2 px-2 justify-center'>
          {domains.map((domain) => (
            <NavLink
              key={domain.to}
              to={domain.to}
              className={({ isActive }) =>
                `text-xl px-5 py-3 rounded-sm transition-colors duration-300 font-semibold ${isActive ? 'bg-base-200' : 'hover:bg-base-200'
                }`
              }
            >
              {domain.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsNav;

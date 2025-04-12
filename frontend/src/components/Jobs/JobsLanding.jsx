import React from 'react'

const JobsLanding = ({ user }) => {
    return (
        <div className='min-h-screen w-full bg-base-100'>
            <div className='flex justify-center mt-5'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold'>Hi, {user?.firstName + " " +  user?.lastName}!</h1>
                    <p className='text-3xl mt-5'>Let’s help you land your dream career</p>
                </div>

                 {/* TODO: Recommended Jobs Component */}

            </div>  
        </div>
    )
}

export default JobsLanding
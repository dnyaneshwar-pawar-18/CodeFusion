import React from 'react'

const Job = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center mt-20'>
            <div className='bg-base-200 p-10 rounded-md w-full sm:w-3/4'>
                <h1 className='text-5xl text-center font-bold text-primary'>Job Board</h1>
                <div className=' flex flex-col sm:flex-row items-center justify-between mt-10'>
                    <div className='w-full sm:w-1/2'>
                        <h4 className='text-xl sm:text-2xl font-semibold'>
                            <i>
                            "Got coding doubts? Get expert answers instantly! Join a thriving developer community where you can ask questions, share insights, and solve real-world coding challenges. Collaborate, learn, and grow together!"
                            </i>
                        </h4>
                        <p className='mt-4 text-lg sm:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione pariatur corporis vero aperiam optio! Sequi optio ipsum totam fugiat rerum ab officiis animi alias, cum molestias numquam nostrum repudiandae doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ipsam praesentium tenetur! Soluta cupiditate facere molestiae temporibus illo numquam, facilis minus. Molestias veritatis laborum est iste, dolores et saepe. Aperiam.</p>
                    </div>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/question-and-answer-illustration-download-in-svg-png-gif-file-formats--answers-faq-comments-chatting-business-pack-people-illustrations-4257057.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Job
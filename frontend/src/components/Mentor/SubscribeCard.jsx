import { Briefcase, Clock3, Flame, MessageSquareMore, Phone } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SubscribeCard = ({mentor}) => {

    function randomNumber() {
        return Math.floor(Math.random() * 5 + 1);
    }

    function randomNumberFees() {
        return Math.floor(Math.random() * 250 + 100);
    }

    return (
        <div className='fixed top-52 right-32 max-w-[30rem] z-50'>
            <div className='bg-base-300 py-10 px-5 rounded-lg'>
                <h1 className='text-5xl font-extrabold'>{`$${randomNumberFees()} `}<span className='text-3xl'>/month</span></h1>

                <p className='text-2xl mt-4'>The most popular way to get mentored, let's work towards your goals!</p>

                <div className='mt-5'>
                    <div className='flex items-center gap-4 mt-2'>
                        <Phone size={28} className='text-primary' />
                        <p className='flex items-center text-2xl'>{`${randomNumber()} calls per month (30min/call)`}</p>
                    </div>

                    <div className='flex items-center gap-4 mt-2'>
                        <MessageSquareMore size={28} className='text-primary' />
                        <p className='flex items-center text-2xl'>Unlimited Q&A via chat</p>
                    </div>

                    <div className='flex items-center gap-4 mt-2'>
                        <Clock3 size={28} className='text-primary' />
                        <p className='flex items-center text-2xl'>Expect responses in 3-4 days</p>
                    </div>

                    <div className='flex items-center gap-4 mt-2 mb-4'>
                        <Briefcase size={28} className='text-primary' />
                        <p className='flex items-center text-2xl'>Hands-on support</p>
                    </div>
                </div>

                <div className='text-center'>
                    <Link to={`/mentors/subscribe/${mentor?._id}`} className='btn btn-primary text-xl mt-4 px-20'>
                        Subscribe Now
                    </Link>
                </div>

                <div className='flex items-center gap-1 mt-4'>
                    <Flame size={27} className='text-secondary' />
                    <p className='flex items-center text-xl text-base-content mt-1'>
                        {`Only ${randomNumber()} spot left!`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SubscribeCard
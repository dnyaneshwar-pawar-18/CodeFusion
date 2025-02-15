import React from 'react';

const QA = () => {
    return (
        <div className="relative w-full min-h-screen flex justify-center items-center mt-20">
            <div className="bg-base-200 p-10 rounded-md w-full sm:w-3/4">
                <h1 className="text-5xl text-center font-bold text-primary">Q & A</h1>

                <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-10">
                    {/* Image */}
                    <img 
                        src="https://cdni.iconscout.com/illustration/premium/thumb/question-and-answer-illustration-download-in-svg-png-gif-file-formats--answers-faq-comments-chatting-business-pack-people-illustrations-4257057.png" 
                        alt="Q&A Illustration" 
                        className="w-full sm:w-1/2 max-w-full h-auto"
                    />

                    <div className="w-full sm:w-1/2">
                        <h4 className="text-xl sm:text-2xl font-semibold">
                            <i>"Got coding doubts? Get expert answers instantly! Join a thriving developer community where you can ask questions, share insights, and solve real-world coding challenges. Collaborate, learn, and grow together!"</i>
                        </h4>
                        <p className="mt-4 text-lg sm:text-xl">
                            Whether you're a beginner or an experienced developer, our community is here to support you. Post your queries, engage in discussions, and receive solutions from peers and industry professionals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QA;

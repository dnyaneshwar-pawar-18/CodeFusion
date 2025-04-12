import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
    const words = ['Data Science', 'Web Dev', 'AI/ML', 'Analytics', 'Big Data'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 100; // Speed of typing
    const deletingSpeed = 40; // Speed of deleting
    const pauseTime = 1000; // Pause time before deleting

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        if (!isDeleting) {
            // Typing effect
            if (displayedText.length < currentWord.length) {
                setTimeout(() => {
                    setDisplayedText(currentWord.slice(0, displayedText.length + 1));
                }, typingSpeed);
            } else {
                // Pause before deleting
                setTimeout(() => setIsDeleting(true), pauseTime);
            }
        } else {
            // Backspacing effect
            if (displayedText.length > 0) {
                setTimeout(() => {
                    setDisplayedText(currentWord.slice(0, displayedText.length - 1));
                }, deletingSpeed);
            } else {
                // Move to next word
                setIsDeleting(false);
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            }
        }
    }, [displayedText, isDeleting, currentWordIndex]);

    return (
        <div className="text-[2rem] md:text-[3rem] lg:text-[6rem] font-bold">
            {displayedText}
            <span className="animate-blink">|</span>
        </div>

    );
};

export default TypingEffect;

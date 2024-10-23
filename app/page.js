"use client"
import React, { useEffect, useState, useCallback } from 'react';

const BirthdayPage = () => {
    const [currentState, setCurrentState] = useState({
        mainText: {
            content: "Happy Birthday!",
            isVisible: true,
            fade: "opacity-0"
        },
        confetti: false,
        images: {
            first: { show: false, fade: "opacity-0", visible: false },
            second: { show: false, fade: "opacity-0" },
            third: { show: false, fade: "opacity-0" },
            fourth: { show: false, fade: "opacity-0" }
        },
        message: "",
        showTyping: false,
        typedText: "",
        audio: null
    });

    const finalMessage = "ನಗು, ಸಂತೋಷ ಮತ್ತು ನಿಮ್ಮನ್ನು ನಗಿಸುವ ಎಲ್ಲಾ ವಿಷಯಗಳಿಂದ ತುಂಬಿದ ದಿನವನ್ನು ನಾನು ಬಯಸುತ್ತೇನೆ! ಈ ವರ್ಷ ನಿಮಗೆ ಹೊಸ ಸಾಹಸಗಳು, ಅದ್ಭುತ ನೆನಪುಗಳು ಮತ್ತು ಅಂತ್ಯವಿಲ್ಲದ ಸಂತೋಷವನ್ನು ತರಲಿ. ದೊಡ್ಡದಾಗಿ ಆಚರಿಸಿ-ನೀವು ಅದಕ್ಕೆ ಅರ್ಹರು!";

    const initializeAudio = useCallback(() => {
        const audio = new Audio('sunshine.mp3');
        audio.volume = 0.2;
        audio.loop = true;
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        return audio;
    }, []);

    const typeWriter = useCallback(() => {
        let index = 0;
        const typing = setInterval(() => {
            setCurrentState(prev => ({
                ...prev,
                typedText: finalMessage.slice(0, index)
            }));
            index++;
            if (index > finalMessage.length) {
                clearInterval(typing);
            }
        }, 100);

        return () => clearInterval(typing);
    }, [finalMessage]);

    useEffect(() => {
        const audio = initializeAudio();
        setCurrentState(prev => ({ ...prev, audio }));

        const sequence = [
            // Initial fade in
            {
                timing: 100,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: { ...prev.mainText, fade: "opacity-100" }
                }))
            },
            // First transition
            {
                timing: 4000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: { ...prev.mainText, fade: "opacity-0" }
                }))
            },
            {
                timing: 4500,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: {
                        content: "Today is Your Special Day!",
                        isVisible: true,
                        fade: "opacity-0"
                    }
                }))
            },
            {
                timing: 4600,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: { ...prev.mainText, fade: "opacity-100" }
                }))
            },
            // Second transition with confetti
            {
                timing: 8000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: { ...prev.mainText, fade: "opacity-0" }
                }))
            },
            {
                timing: 8500,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: {
                        content: "Let's Celebrate!",
                        isVisible: true,
                        fade: "opacity-0"
                    },
                    confetti: true
                }))
            },
            {
                timing: 8600,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: { ...prev.mainText, fade: "opacity-100" }
                }))
            },
            // First image transition
            {
                timing: 12000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    mainText: { ...prev.mainText, fade: "opacity-0" }
                }))
            },
            {
                timing: 12500,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        first: {
                            show: true,
                            fade: "opacity-0",
                            visible: true
                        }
                    }
                }))
            },
            {
                timing: 12600,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        first: { ...prev.images.first, fade: "opacity-100" }
                    },
                    message: "Wishing You Joy!"
                }))
            },
            // Second image transition
            {
                timing: 16000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, first: { ...prev.images.first, fade: "opacity-0" } }
                }))
            },
            {
                timing: 16500,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        first: { show: false, fade: "opacity-0", visible: false },
                        second: { show: true, fade: "opacity-0" }
                    }
                }))
            },
            {
                timing: 16600,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, second: { ...prev.images.second, fade: "opacity-100" } },
                    message: "May Your Dreams Come True!"
                }))
            },
            // Third image transition
            {
                timing: 20000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, second: { ...prev.images.second, fade: "opacity-0" } }
                }))
            },
            {
                timing: 20500,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        second: { show: false, fade: "opacity-0" },
                        third: { show: true, fade: "opacity-0" }
                    }
                }))
            },
            {
                timing: 20600,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, third: { ...prev.images.third, fade: "opacity-100" } },
                    message: "Shine Bright!"
                }))
            },
            // Fourth image transition
            {
                timing: 24000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, third: { ...prev.images.third, fade: "opacity-0" } }
                }))
            },
            {
                timing: 24500,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        third: { show: false, fade: "opacity-0" },
                        fourth: { show: true, fade: "opacity-0" }
                    }
                }))
            },
            {
                timing: 24600,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, fourth: { ...prev.images.fourth, fade: "opacity-100" } },
                    message: "Make a Wish!"
                }))
            },
            // Final message transition
            {
                timing: 28000,
                action: () => setCurrentState(prev => ({
                    ...prev,
                    images: { ...prev.images, fourth: { ...prev.images.fourth, fade: "opacity-0" } }
                }))
            },
            {
                timing: 28500,
                action: () => {
                    setCurrentState(prev => ({
                        ...prev,
                        images: {
                            first: { show: false, fade: "opacity-0", visible: false },
                            second: { show: false, fade: "opacity-0" },
                            third: { show: false, fade: "opacity-0" },
                            fourth: { show: false, fade: "opacity-0" }
                        },
                        showTyping: true
                    }));
                    typeWriter();
                }
            }
        ];

        const timers = sequence.map(({ timing, action }) => 
            setTimeout(action, timing)
        );

        return () => {
            timers.forEach(clearTimeout);
            if (currentState.audio) {
                currentState.audio.pause();
                currentState.audio.currentTime = 0;
            }
        };
    }, [typeWriter, initializeAudio]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                {currentState.confetti && <Confetti />}
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center p-4">
                {currentState.mainText.isVisible && (
                    <div className={`transform transition-all duration-1000 ease-in-out ${currentState.mainText.fade}`}>
                        <h1 className="text-6xl md:text-7xl font-bold text-white text-center">
                            {currentState.mainText.content}
                        </h1>
                    </div>
                )}

                {Object.entries(currentState.images).map(([key, image]) => (
                    image.show && (
                        <div key={key} className={`transform transition-all duration-1000 ease-in-out ${image.fade}`}>
                            <img 
                                src={`/vercel.svg`} 
                                alt={`Birthday Celebration ${key}`} 
                                className="w-64 md:w-96 h-auto rounded-lg shadow-lg" 
                            />
                            <div className="text-2xl md:text-3xl text-white mt-4 text-center font-semibold">
                                {currentState.message}
                            </div>
                        </div>
                    )
                ))}

                {currentState.showTyping && (
                    <div className="max-w-2xl mx-auto p-8 text-white text-2xl md:text-3xl leading-relaxed text-center">
                        {currentState.typedText}
                        <span className="animate-pulse">|</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const Confetti = () => {
    const pieces = Array.from({ length: 150 }, (_, index) => {
        const size = Math.random() * 0.8 + 0.4;
        const colors = [
            'rgba(255, 192, 203, 0.8)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(255, 105, 180, 0.8)',
            'rgba(135, 206, 235, 0.8)',
            'rgba(221, 160, 221, 0.8)',
            'rgba(152, 251, 152, 0.8)',
            'rgba(255, 255, 255, 0.8)'
        ];
        
        const startingLeft = Math.random() * 100;
        const swayAmount = 15;
        
        return {
            id: index,
            size,
            color: colors[Math.floor(Math.random() * colors.length)],
            left: startingLeft,
            swayAmount: (Math.random() - 0.5) * swayAmount,
            animationDuration: Math.random() * 4 + 3,
            animationDelay: Math.random() * -4
        };
    });

    return (
        <>
            {pieces.map(piece => (
                <div
                    key={piece.id}
                    className="absolute rounded-full animate-confetti-smooth"
                    style={{
                        left: `${piece.left}%`,
                        width: `${piece.size}rem`,
                        height: `${piece.size}rem`,
                        backgroundColor: piece.color,
                        boxShadow: `0 0 ${piece.size * 2}px ${piece.color},
                                   0 0 ${piece.size * 4}px ${piece.color},
                                   0 0 ${piece.size * 6}px ${piece.color}`,
                        filter: 'blur(0.5px)',
                        animationDuration: `${piece.animationDuration}s`,
                        animationDelay: `${piece.animationDelay}s`,
                        '--sway-amount': `${piece.swayAmount}px`
                    }}
                />
            ))}
        </>
    );
};

export default BirthdayPage;

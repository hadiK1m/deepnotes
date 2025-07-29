'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, RewindIcon, ForwardIcon } from './icons';

interface MusicPlayerProps {
    audioSrc: string;
    title: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInteracted, setIsInteracted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const percentage = (audio.currentTime / audio.duration) * 100;
            setProgress(percentage);
        };

        const setAudioData = () => {
            setDuration(audio.duration);
        };

        const onAudioEnd = () => {
            setIsPlaying(false);
            setProgress(0);
            audio.currentTime = 0;
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', onAudioEnd);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('ended', onAudioEnd);
        };
    }, []);

    const handlePlayPause = () => {
        if (!isInteracted) {
            setIsInteracted(true);
        }
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(prev => !prev);
    };

    const handleTimeChange = (amount: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + amount));
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && audioRef.current && duration > 0) {
            const progressBar = progressBarRef.current;
            const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
            const progressBarWidth = progressBar.offsetWidth;
            const newTime = (clickPositionX / progressBarWidth) * duration;
            audioRef.current.currentTime = newTime;
        }
    };

    const playLabel = isPlaying ? "Jeda musik" : "Putar musik";

    // Mengontrol status animasi putaran sampul album
    const albumArtAnimation = isInteracted ? 'animate-spin [animation-duration:10s] linear infinite' : '';

    return (
        <>
            <audio
                ref={audioRef}
                src={audioSrc} // <-- GUNAKAN PROP DI SINI
                preload="metadata"
            />
            <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50" aria-label="Pemutar musik">

                {/* --- Tampilan Seluler --- */}
                <div className="md:hidden">
                    <button
                        aria-label={playLabel}
                        className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#110D23]"
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayIcon className="ml-1" />}
                    </button>
                </div>

                {/* --- Tampilan Desktop --- */}
                <div className="hidden md:block">
                    <div className="w-[340px] h-[110px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl flex items-center p-2 pr-4 transition-all duration-500">
                        <div
                            className={`w-24 h-24 rounded-full bg-cover bg-center flex-shrink-0 -ml-4 relative shadow-lg ${albumArtAnimation}`}
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop')",
                                animationPlayState: isPlaying ? 'running' : 'paused'
                            }}
                            role="img"
                            aria-label="Sampul album"
                        >

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-center ml-4 overflow-hidden">
                            <div>
                                <h3 className="text-base font-bold text-gray-800 truncate">{title}</h3>
                            </div>
                            <div
                                ref={progressBarRef}
                                onClick={handleProgressClick}
                                className="w-full mt-2 group cursor-pointer"
                                aria-label="Progres pemutaran"
                            >
                                <div className="bg-gray-200 rounded-full h-1 group-hover:h-1.5 transition-all">
                                    <div
                                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                                        style={{ width: `${progress || 0}%` }}
                                        role="progressbar"
                                        aria-valuenow={Math.round(progress || 0)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-around mt-2 mb-2">
                                <button
                                    aria-label="Mundur 10 detik"
                                    className="w-9 h-9 p-1 flex items-center justify-center text-blue-400 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                                    onClick={() => handleTimeChange(-10)}
                                >
                                    <RewindIcon />
                                </button>
                                <button
                                    aria-label={isPlaying ? "Jeda" : "Putar"}
                                    className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
                                </button>
                                <button
                                    aria-label="Maju 10 detik"
                                    className="w-9 h-9 p-1 flex items-center justify-center text-blue-400 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                                    onClick={() => handleTimeChange(10)}
                                >
                                    <ForwardIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MusicPlayer;
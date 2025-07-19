"use client";

import { DownloadIcon, PlayIcon } from 'lucide-react';
import React from 'react';
// --- PERUBAHAN 1: Impor gambar langsung ---
import hadiImage from '@/assets/images/hadi.png';
import Image from 'next/image';

const AboutMe: React.FC = () => {
    return (
        <div className="text-white min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <style jsx global>{`
                .image-fade-mask {
                    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%);
                    mask-image: linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%);
                }
            `}</style>

            <div className="relative w-full max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                    {/* Left Side */}
                    <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
                        <div className="relative mt-20 lg:mt-0">
                            <div className="relative flex items-end justify-center w-[350px] h-[350px] md:w-[450px] md:h-[450px] mx-auto">
                                <div className="absolute inset-0 flex items-center justify-center z-0">
                                    <div
                                        className="w-full h-full rounded-full border-8 border-violet-600 border-solid"
                                        style={{
                                            boxSizing: 'border-box',
                                            background: 'transparent',
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                                            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                                        }}
                                    ></div>
                                </div>
                                <div className="relative z-10 w-[300px] h-[400px] md:w-[480px] md:h-[533px] flex items-end justify-center overflow-hidden">
                                    {/* --- PERUBAHAN 2: Gunakan gambar yang diimpor --- */}
                                    <Image
                                        src={hadiImage}
                                        alt="Foto Hadi Nurhakim"
                                        className="w-full h-full object-cover object-top border-4 border-gray-700 shadow-lg image-fade-mask"
                                        placeholder="blur" // Menambahkan efek blur saat loading
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
                        <p className="flex items-center justify-center lg:justify-start gap-2 text-lg font-medium text-white mb-4">
                            <span className="text-2xl">👋</span> Hi I&#39;m Hadi Nurhakim
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">
                            Full Stack Web Development
                        </h1>
                        <p className="text-zinc-400 mt-6 max-w-md mx-auto lg:mx-0">
                            {/* Deskripsi Anda bisa ditambahkan di sini */}
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-6 mt-8">
                            <button className="bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-transform hover:scale-105 shadow-md">
                                <DownloadIcon />
                                DOWNLOAD CV
                            </button>
                            <button className="flex items-center gap-3 font-medium group">
                                <div className="w-12 h-12 rounded-full border-2 border-[#A3FF12] flex items-center justify-center transition-transform group-hover:scale-110">
                                    <PlayIcon />
                                </div>
                                PLAY VIDEO
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutMe;

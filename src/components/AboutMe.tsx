"use client";


import React from 'react';
import { DownloadIcon, LinkedinIcon, GithubIcon } from './icons';
import hadiImage from '@/assets/images/hadi.png';
import Image from 'next/image';
import { Youtube } from 'lucide-react';

interface StatProps {
    value: string;
    label: string;
}

const StatItem: React.FC<StatProps> = ({ value, label }) => (
    <div className="text-center md:text-left">
        <p className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-sm lg:text-base text-slate-400">{label}</p>
    </div>
);

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-violet-500 transition-colors duration-300"
    >
        {children}
    </a>
);

const AboutMe: React.FC = () => {
    const stats: StatProps[] = [
        { value: '1+', label: 'Years of Experience' },
        { value: '1+', label: 'Projects Completed' },
        { value: '10', label: 'Opensource Library' },
        { value: '1', label: 'Happy Customers' },
    ];

    return (
        <div className="relative z-10 w-full  mx-auto bg-[#19014c30] backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-900/20 p-8 md:p-12 border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-8">
                    <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight bg-purple-50 bg-clip-text text-transparent mb-2">
                        I am Hadi Nurhakim
                    </h1>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-br from-violet-800 via-violet-900 to-violet-950 bg-clip-text text-transparent">
                            Fullstack Web Developer
                        </span>
                    </h1>
                    <p className="text-shadow-purple-50 max-w-lg">
                        I transform complex product requirements into complete digital solutions, engineering both the intuitive front-end and the powerful back-end to serve millions of users
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <a
                            href="/documents/CV Hadi Nurhakim.pdf"
                            download
                            className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-violet-600 text-violet-600 font-semibold rounded-full hover:bg-violet-800 hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Download CV</span>
                            <DownloadIcon className="w-5 h-5" />
                        </a>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://www.youtube.com/@CodeWithHadiNH"><Youtube className="w-6 h-6" /></SocialLink>
                            <SocialLink href="https://www.linkedin.com/in/hadi-nurhakim-ba68332a4/"><LinkedinIcon className="w-6 h-6" /></SocialLink>
                            <SocialLink href="https://github.com/hadiK1m"><GithubIcon className="w-6 h-6" /></SocialLink>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative w-full max-w-sm mx-auto lg:justify-end ">
                    <div className="absolute -inset-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-60"></div>
                    <div className="relative p-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl">
                        <div className="rounded-[22px] overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-slate-900">
                            <Image
                                src={hadiImage}
                                width={400}
                                height={500}
                                alt="hadi nurhakim, fullstack web developer"
                                className="w-full h-full object-cover grayscale-[30%] contrast-125"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 pt-12 border-t border-slate-800">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <StatItem key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutMe;

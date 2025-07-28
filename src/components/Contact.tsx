
import React from 'react';

const BackgroundGrid: React.FC = () => (
    <svg
        className="absolute inset-0 w-full h-full z-0"
        preserveAspectRatio="none"
        aria-hidden="true"
    >
        <defs>
            <pattern
                id="grid-pattern"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="50%"
            >
                <path
                    d="M0 48L48 48L48 0"
                    fill="none"
                    stroke="rgba(129, 140, 248, 0.1)"
                    strokeWidth="1"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* Larger dots for visual interest */}
        <circle cx="85%" cy="15%" r="2" fill="rgba(129, 140, 248, 0.3)" />
        <circle cx="78%" cy="50%" r="2" fill="rgba(129, 140, 248, 0.3)" />
        <circle cx="92%" cy="80%" r="2" fill="rgba(129, 140, 248, 0.3)" />
        <circle cx="65%" cy="95%" r="2" fill="rgba(129, 140, 248, 0.3)" />
        <circle cx="70%" cy="5%" r="1" fill="rgba(129, 140, 248, 0.3)" />
    </svg>
);


const Contact: React.FC = () => {
    return (
        <footer className="relative w-full overflow-hidden rounded-2xl bg-[#292258] shadow-2xl mb-6">
            <BackgroundGrid />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-8 md:p-12">
                <div className="max-w-2xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Let&apos;s Connect
                    </h2>
                    <p className="mt-3 text-base text-indigo-200">
                        I&apos;m always open to discussions, collaborations, or simply to say hi. Please feel free to contact me.
                    </p>
                </div>
                <div className="flex-shrink-0 w-full lg:w-auto">
                    <form
                        action="mailto:haadinurhakim@gmail.com"
                        method="post"
                        encType="text/plain"
                        className="w-full"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="flex-grow w-full sm:w-auto lg:min-w-96 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#292258] focus:ring-[#6756d1] transition-all duration-300"
                                placeholder="Your email address"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-[#19014c] text-white font-semibold rounded-lg shadow-md hover:bg-[#5849b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#292258] focus:ring-[#6756d1] transition-colors duration-300"
                            >
                                Hubungi Saya
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Contact;

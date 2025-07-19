
import Image from 'next/image';
import { useEffect, useState } from 'react';
import swipeIcon from '@/assets/icons/swipe.svg';


const skills = [
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/white' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/white' },
    { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/white' },
    { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/white' },
    { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/white' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/white' },
    { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/white' },
    { name: 'UI/UX Design', logo: null },
    { name: 'Gemini API', logo: null },
    { name: 'Git & GitHub', logo: 'https://cdn.simpleicons.org/github/white' },
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/white' },
    { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/white' },
    { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/white' },
    { name: 'REST API', logo: null },
];


export default function SkillsCarousel() {
    const extendedSkills = [...skills, ...skills.slice(0, 5)];
    const [showSwipe, setShowSwipe] = useState(false);

    useEffect(() => {
        // Tampilkan icon swipe hanya saat pertama kali halaman dimuat
        setShowSwipe(true);
        const timer = setTimeout(() => setShowSwipe(false), 60000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="skills" className="py-24 overflow-hidden relative">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">Skills & Technologies</h2>
                <p className="text-gray-400 mt-2">The tools I use to turn ideas into reality.</p>
            </div>
            <div className="carousel-container max-w-full mx-auto relative">
                {/* Icon swipe overlay */}
                <div className="relative">
                    <div className="flex items-center overflow-x-auto space-x-12 py-4 px-4 no-scrollbar">
                        {extendedSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center justify-center space-y-3 flex-shrink-0 text-center w-28">
                                {skill.logo ? (
                                    <Image src={skill.logo} alt={`${skill.name} Logo`} width={48} height={48} className="h-12 w-12" />
                                ) : (
                                    <div className="h-12 w-12 flex items-center justify-center">
                                        <span className="font-bold text-white text-lg text-center">{skill.name}</span>
                                    </div>
                                )}
                                <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    {showSwipe && (
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-25 z-30 flex flex-col items-center pointer-events-none select-none animate-fade-in-out">
                            <Image src={swipeIcon} alt="Swipe Icon" width={80} height={80} className="w-20 h-20 mt-2 animate-swipe-gesture" />
                            <span className="text-amber-50 font-semibold animate-pulse">Swipe</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Animasi swipe keyframes */}
            <style jsx>{`
                @keyframes swipe-gesture {
                    0% { transform: translateX(0); opacity: 1; }
                    10% { transform: translateX(0); opacity: 1; }
                    20% { transform: translateX(40px) scale(1.08); opacity: 1; }
                    35% { transform: translateX(-40px) scale(1.08); opacity: 1; }
                    50% { transform: translateX(0) scale(1); opacity: 1; }
                    100% { transform: translateX(0) scale(1); opacity: 1; }
                }
                .animate-swipe-gesture {
                    animation: swipe-gesture 60s cubic-bezier(0.4,0,0.2,1) 1;
                }
                @keyframes fadeInOut {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { opacity: 0; }
                }
                .animate-fade-in-out {
                    animation: fadeInOut 60.5s both;
                }
            `}</style>
        </section>
    );
}
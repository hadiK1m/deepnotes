import Image from 'next/image';

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
    { name: 'Git & GitHub', logo: 'https://cdn.simpleicons.org/github/white' }
];

export default function SkillsCarousel() {
    const extendedSkills = [...skills, ...skills.slice(0, 5)];

    return (
        <section id="skills" className="py-24 overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">Keahlian & Teknologi</h2>
                <p className="text-gray-400 mt-2">Teknologi yang saya kuasai untuk mewujudkan ide menjadi kenyataan.</p>
            </div>
            <div className="carousel-container max-w-full mx-auto">
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
            </div>
        </section>
    );
}
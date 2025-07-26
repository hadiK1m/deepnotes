import React from 'react';
import Contact from './Contact';
import { Linkedin, LucideGithub, YoutubeIcon } from 'lucide-react';

// Data for the footer links
const aboutLinks = ['Home'];
const languages = [
    'English'
];

const InfoFooter: React.FC = () => {
    return (
        <footer id='sitefooter' className="w-full bg-[#19014c30] text-white rounded-2xl p-8 md:p-12 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
                {/* About the store */}
                <div>
                    <h3 className="font-bold text-lg mb-4">About This Website</h3>
                    <ul className="space-y-2">
                        {aboutLinks.map(link => (
                            <li key={link}><a href="#" className="text-gray-300 hover:text-white transition-colors text-base">{link}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Language */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Language</h3>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                        {languages.map(lang => (
                            <a
                                key={lang}
                                href="#"
                                className={`
                                    py-1 px-2 rounded-md  transition-colors text-base
                                    ${lang === 'English'
                                        ? 'bg-teal-400 text-slate-800 font-semibold'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                {lang}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Get in touch */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Get in touch</h3>
                    <div className="flex space-x-4">
                        <a href="https://github.com/hadiK1m" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label="GitHub"><LucideGithub /></a>
                        <a href="https://www.linkedin.com/in/hadi-nurhakim-ba68332a4/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label="LinkedIn"><Linkedin /></a>
                        <a href="https://www.youtube.com/@CodeWithHadiNH" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label="LinkedIn"><YoutubeIcon /></a>
                    </div>
                </div>
            </div>

            <Contact />

            {/* Bottom links */}
            <div className="border-t border-gray-500/30 pt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Terms of purchase</a>
                <a href="#" className="hover:text-white transition-colors">Security and privacy</a>
                <a href="#" className="hover:text-white transition-colors">Newsletter</a>
            </div>
        </footer>
    );
};

export default InfoFooter;
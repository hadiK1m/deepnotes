import React from 'react';
import Contact from './Contact';

// Data for the footer links
const aboutLinks = ['Home', 'Become a customer', 'About us', 'FAQ', 'Return policy', 'Contact us'];
const languages = [
    'Indonesia'
];

// Social Icons as React Components
const FacebookIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const TwitterIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const LinkedInIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const InfoFooter: React.FC = () => {
    return (
        <footer className="w-full bg-[#19014c30] text-white rounded-2xl p-8 md:p-12 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
                {/* About the store */}
                <div>
                    <h3 className="font-bold text-lg mb-4">About the store</h3>
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
                        <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label="Facebook"><FacebookIcon /></a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label="Twitter"><TwitterIcon /></a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label="LinkedIn"><LinkedInIcon /></a>
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
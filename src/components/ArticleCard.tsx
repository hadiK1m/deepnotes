// Lokasi: src/components/ArticleCard.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Ikon sederhana, karena SocialIcons tidak ada
const ArrowUpRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

// Tipe data disesuaikan dengan skema database
interface Article {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    tag: string | null;
    author: string;
    readTime: string | null;
    image: string | null;
    createdAt: Date;
}

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const { title, description, author, readTime, tag, image, slug, createdAt } = article;
    const href = `/materi/${slug}`;

    return (
        <Link
            href={href}
            className="block group bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 flex-col"
        >
            <div className="relative mb-4">
                <Image
                    src={image || 'https://placehold.co/600x400/1e1b4b/9333ea?text=Materi'}
                    alt={title}
                    className="w-full h-48 object-cover rounded-lg"
                    width={600}
                    height={400}
                />
                <div className="absolute top-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 bg-black/40 backdrop-blur-sm rounded-full">
                        <ArrowUpRightIcon className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <p className="text-sm text-gray-400 mb-2">{author} · {readTime || '5 menit'}</p>
                <h3 className="font-bold text-white mb-2 leading-tight text-lg">{title}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{description}</p>

                <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-white/10">
                    {tag && <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>}
                    <span className="text-gray-500">{new Date(createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;
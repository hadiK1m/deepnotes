// Lokasi: src/components/Projects.tsx

import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/db';
import { materi as materiSchema } from '@/db/schema';
import { inArray } from 'drizzle-orm';

// Definisikan tipe data untuk proyek
interface Project {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    tag: string | null;
    image: string | null;
}

// Fungsi untuk mengambil data proyek dari database
async function getProjects(): Promise<Project[]> {
    try {
        // Ambil materi dengan ID 8 dan 9
        const projects = await db.select()
            .from(materiSchema)
            .where(inArray(materiSchema.id, [8, 9])); // Menggunakan ID 8 dan 9

        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return []; // Kembalikan array kosong jika terjadi error
    }
}

// Ubah komponen menjadi async function
export default async function Projects() {
    const projects = await getProjects();

    return (
        <section id="projects" className="py-24">
            <div className="text-center mb-16 fade-in-up">
                <h2 className="text-4xl font-bold">Project Highlights</h2>
                <p className="text-gray-400 mt-2">A showcase of my development work.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Tampilkan data proyek secara dinamis */}
                {projects.map((project, index) => (
                    <Link
                        href={`/materi/${project.slug}`}
                        key={project.id}
                        className="glass-card rounded-2xl overflow-hidden group fade-in-up"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <Image
                            src={project.image || `https://placehold.co/600x400/1e1b4b/9333ea?text=Project`}
                            alt={`Gambar ${project.title}`}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tag && (
                                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                                        {project.tag}
                                    </span>
                                )}
                                {/* Anda bisa menambahkan lebih banyak tag di sini jika perlu */}
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    );
}
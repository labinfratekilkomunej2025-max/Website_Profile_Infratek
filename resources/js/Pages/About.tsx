import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

// --- Komponen Bantuan untuk Ikon Sosial Media ---
const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
);

export default function About() {
    // --- STRUKTUR DATA FULL ASISTEN LABORATORIUM ---
    const management = {
        period: "2023 / 2024",
        bph: [
            {
                name: "Anugrah Farel Putra Firdyantara",
                position: "Ketua Koordinator Asisten Laboratorium",
                image: "https://ui-avatars.com/api/?name=Anugrah+Farel&background=0D8ABC&color=fff",
                linkedin: "https://www.linkedin.com/search/results/all/?keywords=anugrah+farel+putra+firdyantara",
                instagram: "https://instagram.com/izuna_aja",
                birthdate: "7/27/2004"
            },
            {
                name: "Ifran Raffi Gunawan",
                position: "Sekretaris Asisten Laboratorium",
                image: "https://ui-avatars.com/api/?name=Ifran+Raffi&background=0D8ABC&color=fff",
                linkedin: "https://www.linkedin.com/search/results/all/?keywords=Ifran+Raffi+Gunawan",
                instagram: "https://instagram.com/raffiefh",
                birthdate: "5/8/2006"
            },
            {
                name: "Rizqi Cahyani Putri N.",
                position: "Bendahara Asisten Laboratorium",
                image: "https://ui-avatars.com/api/?name=Rizqi+Cahyani&background=0D8ABC&color=fff",
                linkedin: "",
                instagram: "https://instagram.com/iiiccc_aaa",
                birthdate: "6/25/2005"
            }
        ],
        divisions: [
            {
                name: "Pengembangan Ilmu",
                head: {
                    name: "Muhammad Fairuz Zaki",
                    position: "Ketua Divisi Asisten Laboratorium",
                    image: "https://ui-avatars.com/api/?name=Muhammad+Fairuz&background=2563EB&color=fff",
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Muhammad+Fairuz+Zaki",
                    instagram: "https://instagram.com/fairuzzkii",
                    birthdate: "6/11/2005"
                },
                members: [
                    { name: "Monica Putri Perdani", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Monica+Putri&background=E5E7EB&color=374151", linkedin: "", instagram: "https://instagram.com/_monicaptri", birthdate: "3/2/2005" },
                    { name: "Aden Alexandria Syaiful P.", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Aden+Alexandria&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Aden+Alexandria+Syaiful+Perdana", instagram: "https://instagram.com/aden.alexandria", birthdate: "9/13/2005" },
                    { name: "Rivat Defryanto", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Rivat+Defryanto&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Rivat+Defryanto", instagram: "https://instagram.com/sayadfryn", birthdate: "12/6/2005" },
                    { name: "Adrian Rizqynaya Putra", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Adrian+Rizqynaya&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Adrian+Rizqynaya+Putra", instagram: "https://instagram.com/rizqyny", birthdate: "4/13/2006" },
                    { name: "Rangga Pramudya Setiawan", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Rangga+Pramudya&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Rangga+Pramudya+Setiawan", instagram: "https://instagram.com/ranggaps_23", birthdate: "4/23/2005" },
                    { name: "Kiarra Putri Mulya K. W.", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Kiarra+Putri&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Kiarra+Putri+Mulya+Kusuma+Wardani", instagram: "https://instagram.com/kiarra_aja", birthdate: "6/23/2006" },
                    { name: "Faiz Ulfia Sasmita", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Faiz+Ulfia&background=E5E7EB&color=374151", linkedin: "", instagram: "https://instagram.com/iamita.f", birthdate: "8/16/2025" }
                ]
            },
            {
                name: "Penelitian dan Pengabdian",
                head: {
                    name: "Widya Fitriadi Nugraha",
                    position: "Ketua Divisi Asisten Laboratorium",
                    image: "https://ui-avatars.com/api/?name=Widya+Fitriadi&background=2563EB&color=fff",
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Widya+Fitriadi+Nugraha",
                    instagram: "https://instagram.com/widy4aan",
                    birthdate: "7/22/2005"
                },
                members: [
                    { name: "Edwin Iqbal Santoso", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Edwin+Iqbal&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Edwin+Iqbal+santoso", instagram: "https://instagram.com/Edwiniqb", birthdate: "11/8/2004" },
                    { name: "Syahrial Rafky", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Syahrial+Rafky&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Syahrial+Rafky", instagram: "https://instagram.com/skylumie", birthdate: "1/8/2005" },
                    { name: "Muhammad Syaifur Rozi", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Muhammad+Syaifur&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Muhammad+Syaifur+Rozi", instagram: "https://instagram.com/oujisan0x7a", birthdate: "8/3/2004" },
                    { name: "Fajar Ilham Arifiyanto", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Fajar+Ilham&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Fajar+Ilham+Arifiyanto", instagram: "https://instagram.com/fagamby.id", birthdate: "9/7/2004" },
                    { name: "Aditya Bayu Pratama", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Aditya+Bayu&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Aditya+Bayu+Pratama", instagram: "https://instagram.com/adityabayu.pratama.7", birthdate: "9/8/2005" },
                    { name: "Bagas Al Akbar Maulana", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Bagas+Al+Akbar&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Bagas+Al+Akbar+Maulana", instagram: "https://instagram.com/bagasakbar159", birthdate: "7/15/2005" },
                    { name: "Ahmad Zafarell Zouvan Dhani", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Ahmad+Zafarell&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=ahmad+zafarell", instagram: "https://instagram.com/akupengenmenanglomba", birthdate: "10/17/2005" },
                    { name: "Erga Pratama", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Erga+Pratama&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Erga+Pratama", instagram: "https://instagram.com/ergaaprtm_", birthdate: "12/1/2005" }
                ]
            },
            {
                name: "Mediatek",
                head: {
                    name: "Mukhammad Alyasyi Thobiq",
                    position: "Ketua Divisi Asisten Laboratorium",
                    image: "https://ui-avatars.com/api/?name=Mukhammad+Alyasyi&background=2563EB&color=fff",
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Mukhamad+Alyasyi+Thobiq",
                    instagram: "https://instagram.com/m.alyasyi_tbq",
                    birthdate: "12/24/2004"
                },
                members: [
                    { name: "Dina Lu'luul Karimah", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Dina+Luluul&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Dina+Lu%27luul+Karimah", instagram: "https://instagram.com/hn.dinaull", birthdate: "2/14/2005" },
                    { name: "Eggy Tio Wandana", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Eggy+Tio&background=E5E7EB&color=374151", linkedin: "", instagram: "https://instagram.com/gitio.ea", birthdate: "5/9/2004" },
                    { name: "Hafidlul Muffid Hidayat", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Hafidlul+Muffid&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Hafidlul+Muffid", instagram: "https://instagram.com/hafidlul._", birthdate: "12/17/2005" },
                    { name: "Dimas Kurniawan Hariyanto", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Dimas+Kurniawan&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Dimas+Kurniawan+Hariyanto", instagram: "https://instagram.com/dmskrnwnhrynt", birthdate: "7/10/2006" },
                    { name: "Randika Putri Sonata", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Randika+Putri&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Randika+Putri+Sonata", instagram: "https://instagram.com/jbasqr", birthdate: "7/28/2004" },
                    { name: "Muh Damar Candra Wibawa", position: "Anggota Divisi Asisten Laboratorium", image: "https://ui-avatars.com/api/?name=Muh+Damar&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Muh+Damar+Candra+Wibawa", instagram: "https://instagram.com/damarchn", birthdate: "9/2/2005" }
                ]
            }
        ]
    };

    // --- Komponen Kartu Profil (Reusable) ---
    const ProfileCard = ({ person, isHead = false, isBph = false }: { person: any, isHead?: boolean, isBph?: boolean }) => {
        const isKasub = person.position?.includes("Kepala Subdivisi");

        return (
            <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isHead ? 'ring-2 ring-blue-400' : isKasub ? 'ring-1 ring-blue-200' : ''}`}>
                <div className="relative mb-4">
                    <img
                        src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
                        alt={person.name}
                        className={`rounded-full object-cover border-4 bg-gray-50 ${isBph ? 'w-24 h-24 border-blue-100' : isHead ? 'w-20 h-20 border-blue-400' : 'w-16 h-16 border-gray-100'}`}
                    />
                    {isHead && (
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                            KETUA DIVISI
                        </span>
                    )}
                </div>
                <h4 className="font-bold text-gray-800 text-center text-sm md:text-base mb-1">{person.name}</h4>
                <p className={`text-xs text-center mb-2 ${isKasub ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>{person.position}</p>
                
                {person.birthdate && (
                    <div className="text-xs text-center text-gray-400 font-medium mb-4 flex items-center gap-1.5">
                        <span>🎂</span> {person.birthdate}
                    </div>
                )}
                
                {/* Social Links */}
                <div className="flex gap-3 mt-auto">
                    {person.linkedin && (
                        <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <LinkedInIcon />
                        </a>
                    )}
                    {person.instagram && (
                        <a href={person.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                            <InstagramIcon />
                        </a>
                    )}
                </div>
            </div>
        );
    };

    return (
        <MainLayout>
            <Head title="Tentang Kami - HIMATIF" />

            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/50">

                {/* HERO HEADER */}
                <section className="pt-32 pb-16 text-center px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">
                        Tentang <span className="text-blue-600">HIMATIF</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        HIMATIF memiliki struktur kepengurusan yang bertanggung jawab atas berbagai aspek dan kegiatan organisasi untuk mencapai tujuan bersama.
                    </p>
                </section>

                {/* VISI & MISI */}
                <section className="max-w-6xl mx-auto px-6 mb-24">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl relative overflow-hidden group flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-bl-full transition-transform duration-500 group-hover:scale-125"></div>
                            <h2 className="text-3xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                                <span className="p-2 bg-white/20 rounded-lg">🎯</span> Visi
                            </h2>
                            <p className="text-blue-50 text-lg leading-relaxed relative z-10 italic">
                                "Menjadi organisasi yang unggul dan aktif di bidang pengembangan teknologi serta menjadi sarana untuk menunjang kompetensi mahasiswa."
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">🚀</span> Misi
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Meningkatkan kompetensi mahasiswa Teknologi Informasi di berbagai bidang keilmuan.",
                                    "Mengembangkan potensi mahasiswa melalui kegiatan terstruktur dan inovatif.",
                                    "Meningkatkan kualitas sumber daya manusia dan menjaga budaya kerja yang profesional."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 group">
                                        <span className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {idx + 1}
                                        </span>
                                        <p className="text-slate-700 pt-1">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* STRUKTUR ORGANISASI */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Struktur Organisasi</h2>
                        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-semibold text-sm">
                            Angkatan {management.period}
                        </div>
                    </div>

                    {/* LEVEL 1: BPH (Badan Pengurus Harian) */}
                    <div className="mb-20">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest text-opacity-50">Badan Pengurus Harian</h3>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                            {/* Bendahara (Kiri di desktop) */}
                            <div className="order-2 md:order-1 w-full md:w-64">
                                <ProfileCard person={management.bph[2]} isBph={true} />
                            </div>
                            
                            {/* Ketua (Tengah, lebih besar) */}
                            <div className="order-1 md:order-2 w-full md:w-72 transform md:-translate-y-6">
                                <div className="bg-white rounded-3xl shadow-xl border-t-4 border-blue-600 flex flex-col items-center p-8 hover:-translate-y-2 transition-transform duration-300">
                                    <img src={management.bph[0].image} alt="Ketua" className="w-28 h-28 rounded-full border-4 border-blue-50 shadow-md mb-4" />
                                    <h3 className="font-bold text-xl text-slate-800 text-center">{management.bph[0].name}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-4 py-1.5 rounded-full mt-2 mb-3 text-center leading-tight">{management.bph[0].position}</span>
                                    {management.bph[0].birthdate && (
                                        <div className="text-sm text-slate-400 font-medium mb-5 flex items-center gap-1.5">
                                            <span>🎂</span> {management.bph[0].birthdate}
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        <a href={management.bph[0].linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600"><LinkedInIcon /></a>
                                        <a href={management.bph[0].instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600"><InstagramIcon /></a>
                                    </div>
                                </div>
                            </div>

                            {/* Sekretaris (Kanan di desktop) */}
                            <div className="order-3 w-full md:w-64">
                                <ProfileCard person={management.bph[1]} isBph={true} />
                            </div>
                        </div>
                    </div>

                    {/* LEVEL 2: DIVISI & ANGGOTA */}
                    <div className="space-y-16">
                        {management.divisions.map((div, idx) => (
                            <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                {/* Header Divisi */}
                                <div className="bg-slate-50 border-b border-slate-100 p-6 text-center">
                                    <h3 className="font-bold text-2xl text-slate-800">{div.name}</h3>
                                </div>

                                <div className="p-8">
                                    {/* Kepala Divisi */}
                                    <div className="flex justify-center mb-10">
                                        <div className="w-64">
                                            <ProfileCard person={div.head} isHead={true} />
                                        </div>
                                    </div>

                                    {/* Anggota */}
                                    {div.members.length > 0 ? (
                                        <>
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="h-px bg-slate-200 flex-1"></div>
                                                <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Anggota Divisi</span>
                                                <div className="h-px bg-slate-200 flex-1"></div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                                {div.members.map((member, mIdx) => (
                                                    <ProfileCard key={mIdx} person={member} />
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-center text-slate-400 text-sm italic bg-slate-50 py-4 rounded-lg">Belum ada data anggota untuk divisi ini.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            </div>
        </MainLayout>
    );
}
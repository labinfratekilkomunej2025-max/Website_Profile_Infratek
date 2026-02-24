import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

// --- Komponen Bantuan untuk Ikon Sosial Media ---
const LinkedInIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

export default function About() {
    // --- STRUKTUR DATA FULL LAB INFRATEK ---
    const management = {
        period: "2024 / 2025",
        lecturers: [
            {
                name: "Yanuar Nurdiansyah, S.T., M.Cs.",
                position: "Kepala Laboratorium",
                image: "/assets/images/struktur_organisasi/yanuar.png",
                linkedin: "https://www.linkedin.com/in/yanuar-nurdiansyah",
                description: "Mengawasi, mengarahkan, dan bertanggung jawab penuh atas seluruh kegiatan akademik, riset, serta pengembangan infrastruktur di dalam lingkungan laboratorium."
            },
            {
                name: "Widya Dwinoto Darmawan, S.T.",
                position: "Pranata Laboratorium",
                image: "/assets/images/struktur_organisasi/widy.png",
                linkedin: "",
                description: "Bertanggung jawab atas pengelolaan teknis harian, pemeliharaan infrastruktur jaringan, serta memastikan seluruh perangkat keras dan lunak laboratorium berfungsi optimal."
            }
        ],
        bph: [
            {
                name: "Anugrah Farel Putra Firdyantara",
                position: "Ketua Koordinator Asisten",
                image: "https://ui-avatars.com/api/?name=Anugrah+Farel&background=0D8ABC&color=fff",
                linkedin: "https://www.linkedin.com/search/results/all/?keywords=anugrah+farel+putra+firdyantara",
            },
            {
                name: "Ifran Raffi Gunawan",
                position: "Sekretaris",
                image: "https://ui-avatars.com/api/?name=Ifran+Raffi&background=0D8ABC&color=fff",
                linkedin: "https://www.linkedin.com/search/results/all/?keywords=Ifran+Raffi+Gunawan",
            },
            {
                name: "Rizqi Cahyani Putri N.",
                position: "Bendahara",
                image: "https://ui-avatars.com/api/?name=Rizqi+Cahyani&background=0D8ABC&color=fff",
                linkedin: "",
            }
        ],
        divisions: [
            {
                name: "Pengembangan Ilmu",
                head: {
                    name: "Muhammad Fairuz Zaki",
                    position: "Ketua Divisi",
                    image: "https://ui-avatars.com/api/?name=Muhammad+Fairuz&background=2563EB&color=fff",
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Muhammad+Fairuz+Zaki",
                },
                members: [
                    { name: "Monica Putri Perdani", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Monica+Putri&background=E5E7EB&color=374151", linkedin: "" },
                    { name: "Aden Alexandria Syaiful P.", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Aden+Alexandria&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Aden+Alexandria+Syaiful+Perdana" },
                    { name: "Rivat Defryanto", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Rivat+Defryanto&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Rivat+Defryanto" },
                    { name: "Adrian Rizqynaya Putra", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Adrian+Rizqynaya&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Adrian+Rizqynaya+Putra" },
                    { name: "Rangga Pramudya Setiawan", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Rangga+Pramudya&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Rangga+Pramudya+Setiawan" },
                    { name: "Kiarra Putri Mulya K. W.", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Kiarra+Putri&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Kiarra+Putri+Mulya+Kusuma+Wardani" },
                    { name: "Faiz Ulfia Sasmita", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Faiz+Ulfia&background=E5E7EB&color=374151", linkedin: "" }
                ]
            },
            {
                name: "Penelitian dan Pengabdian",
                head: {
                    name: "Widya Fitriadi Nugraha",
                    position: "Ketua Divisi",
                    image: "https://ui-avatars.com/api/?name=Widya+Fitriadi&background=2563EB&color=fff",
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Widya+Fitriadi+Nugraha",
                },
                members: [
                    { name: "Edwin Iqbal Santoso", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Edwin+Iqbal&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Edwin+Iqbal+santoso" },
                    { name: "Syahrial Rafky", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Syahrial+Rafky&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Syahrial+Rafky" },
                    { name: "Muhammad Syaifur Rozi", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Muhammad+Syaifur&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Muhammad+Syaifur+Rozi" },
                    { name: "Fajar Ilham Arifiyanto", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Fajar+Ilham&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Fajar+Ilham+Arifiyanto" },
                    { name: "Aditya Bayu Pratama", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Aditya+Bayu&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Aditya+Bayu+Pratama" },
                    { name: "Bagas Al Akbar Maulana", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Bagas+Al+Akbar&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Bagas+Al+Akbar+Maulana" },
                    { name: "Ahmad Zafarell Zouvan D.", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Ahmad+Zafarell&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=ahmad+zafarell" },
                    { name: "Erga Pratama", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Erga+Pratama&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Erga+Pratama" }
                ]
            },
            {
                name: "Mediatek",
                head: {
                    name: "Mukhammad Alyasyi Thobiq",
                    position: "Ketua Divisi",
                    image: "https://ui-avatars.com/api/?name=Mukhammad+Alyasyi&background=2563EB&color=fff",
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=Mukhamad+Alyasyi+Thobiq",
                },
                members: [
                    { name: "Dina Lu'luul Karimah", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Dina+Luluul&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Dina+Lu%27luul+Karimah" },
                    { name: "Eggy Tio Wandana", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Eggy+Tio&background=E5E7EB&color=374151", linkedin: "" },
                    { name: "Hafidlul Muffid Hidayat", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Hafidlul+Muffid&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Hafidlul+Muffid" },
                    { name: "Dimas Kurniawan Hariyanto", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Dimas+Kurniawan&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Dimas+Kurniawan+Hariyanto" },
                    { name: "Randika Putri Sonata", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Randika+Putri&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Randika+Putri+Sonata" },
                    { name: "Muh Damar Candra Wibawa", position: "Anggota Divisi", image: "https://ui-avatars.com/api/?name=Muh+Damar&background=E5E7EB&color=374151", linkedin: "https://www.linkedin.com/search/results/all/?keywords=Muh+Damar+Candra+Wibawa" }
                ]
            }
        ]
    };

    // --- Komponen Kartu Profil (Reusable) ---
    const ProfileCard = ({ person, isHead = false, isBph = false, isLecturer = false, delay = "0s" }: { person: any, isHead?: boolean, isBph?: boolean, isLecturer?: boolean, delay?: string }) => {
        
        // Inline style untuk trigger animasi fade-in-up per komponen
        const animStyle = {
            animation: `fadeInUp 0.6s ease-out ${delay} both`
        };

        // Desain Khusus untuk Kepala/Pranata Lab
        if (isLecturer) {
            return (
                <div style={animStyle} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-t-4 border-blue-600 p-8 flex flex-col items-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-150 group-hover:bg-blue-100/50"></div>
                    <img
                        src={person.image}
                        alt={person.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-5 bg-gray-50 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
                    />
                    <h4 className="font-extrabold text-xl text-slate-800 text-center mb-1">{person.name}</h4>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">{person.position}</span>
                    <p className="text-sm text-slate-600 text-center leading-relaxed mb-6 flex-grow">{person.description}</p>
                    
                    {person.linkedin && (
                        <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors mt-auto group/icon">
                            <LinkedInIcon />
                        </a>
                    )}
                </div>
            );
        }

        // Desain untuk Mahasiswa (BPH, Kadiv, Anggota)
        return (
            <div style={animStyle} className={`bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col items-center p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 group ${isHead ? 'ring-1 ring-blue-300' : ''}`}>
                <div className="relative mb-4">
                    <img
                        src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
                        alt={person.name}
                        className={`rounded-full object-cover bg-gray-50 transition-transform duration-500 group-hover:scale-110 ${isBph ? 'w-24 h-24 border-4 border-blue-50 shadow-sm' : isHead ? 'w-20 h-20 border-2 border-blue-200 shadow-sm' : 'w-16 h-16 border-2 border-slate-100'}`}
                    />
                    {isHead && (
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                            KADIV
                        </span>
                    )}
                </div>
                <h4 className="font-bold text-center mb-1 text-sm md:text-base text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{person.name}</h4>
                <p className={`text-xs text-center mb-4 ${isHead ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>{person.position}</p>
                
                {/* Social Links (Hanya LinkedIn) */}
                <div className="flex mt-auto">
                    {person.linkedin ? (
                        <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-blue-600 transition-colors group/icon">
                            <LinkedInIcon />
                        </a>
                    ) : (
                        <span className="h-5"></span> // Placeholder
                    )}
                </div>
            </div>
        );
    };

    return (
        <MainLayout>
            <Head title="Tentang Kami - Lab Infratek" />

            {/* INJEKSI CSS KEYFRAMES MURNI UNTUK ANIMASI */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .bg-pattern {
                    background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0);
                    background-size: 32px 32px;
                }
            `}</style>

            <div className="min-h-screen bg-slate-50 font-sans pb-24 overflow-hidden">

                {/* HERO HEADER */}
                <section className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white text-center">
                    {/* Hiasan Latar dengan Pattern */}
                    <div className="absolute inset-0 bg-pattern pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto" style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}>
                        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-5 py-1.5 rounded-full font-semibold text-sm mb-6 shadow-sm hover:bg-white/20 transition-colors cursor-default">
                            Profil Laboratorium
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 animate-pulse">Kami</span>
                        </h1>
                        <p className="text-blue-100/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Mengenal lebih dekat visi, misi, dan orang-orang hebat di balik Laboratorium Infrastruktur Teknologi (Infratek).
                        </p>
                    </div>

                    {/* Efek Gradien Bawah agar nge-blend ke section berikutnya */}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
                </section>

                {/* VISI & MISI */}
                <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 mb-24">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Card Visi */}
                        <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner animate-float border border-blue-100/50">
                                <span className="text-3xl drop-shadow-sm">🎯</span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">Visi</h2>
                            <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-blue-500 pl-5 bg-blue-50/30 py-3 pr-3 rounded-r-xl">
                                "Menjadi Laboratorium yang unggul dan aktif di bidang pengembangan teknologi serta menjadi sarana praktikum untuk menunjang kompetensi yang dimiliki."
                            </p>
                        </div>

                        {/* Card Misi */}
                        <div style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner animate-float border border-indigo-100/50" style={{ animationDelay: '1.5s' }}>
                                <span className="text-3xl drop-shadow-sm">🚀</span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-6 group-hover:text-indigo-700 transition-colors">Misi</h2>
                            <ul className="space-y-5">
                                {[
                                    "Meningkatkan kompetensi mahasiswa di bidang sistem operasi dan jaringan melalui praktikum profesional.",
                                    "Mengembangkan potensi mahasiswa dalam menggunakan sistem operasi dan jaringan secara terstruktur.",
                                    "Meningkatkan kualitas SDM dan budaya kerja di bidang sistem operasi dan jaringan."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
                                        <span className="flex-shrink-0 w-8 h-8 bg-slate-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm border border-slate-200 shadow-sm">
                                            {idx + 1}
                                        </span>
                                        <p className="text-slate-700 pt-1 leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* STRUKTUR ORGANISASI */}
                <section className="max-w-7xl mx-auto px-6">
                    <div style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">Struktur Organisasi</h2>
                        <div className="inline-block bg-slate-200 text-slate-700 px-5 py-1.5 rounded-full font-bold text-sm shadow-inner">
                            Periode {management.period}
                        </div>
                    </div>

                    {/* LEVEL 1: KEPALA & PRANATA LAB */}
                    <div className="mb-20">
                        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 max-w-4xl mx-auto">
                            {management.lecturers.map((lecturer, idx) => (
                                <div key={idx} className="w-full md:w-1/2 flex">
                                    <div className="w-full">
                                        {/* Delay berurutan berdasarkan index */}
                                        <ProfileCard person={lecturer} isLecturer={true} delay={`${0.7 + (idx * 0.2)}s`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider Estetik */}
                    <div style={{ animation: 'fadeInUp 0.8s ease-out 1s both' }} className="flex items-center justify-center gap-4 mb-16 max-w-md mx-auto opacity-50">
                        <div className="h-px bg-slate-300 flex-1"></div>
                        <span className="text-slate-400 text-sm font-bold tracking-widest uppercase">Elemen Mahasiswa</span>
                        <div className="h-px bg-slate-300 flex-1"></div>
                    </div>

                    {/* LEVEL 2: BPH (Ketua, Sekretaris, Bendahara) */}
                    <div className="mb-24 relative">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                            {/* Bendahara (Kiri) */}
                            <div className="order-2 md:order-1 w-full md:w-64 z-10">
                                <ProfileCard person={management.bph[2]} isBph={true} delay="1.2s" />
                            </div>
                            
                            {/* Ketua (Tengah) - Desain menonjol */}
                            <div className="order-1 md:order-2 w-full md:w-80 transform md:-translate-y-8 z-20" style={{ animation: 'fadeInUp 0.8s ease-out 1.1s both' }}>
                                <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-2xl border-t-4 border-yellow-400 flex flex-col items-center p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-yellow-400/20 group">
                                    <div className="relative mb-5">
                                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        <img src={management.bph[0].image} alt="Ketua" className="relative w-32 h-32 rounded-full border-4 border-white shadow-md object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                                    </div>
                                    <h3 className="font-extrabold text-xl text-slate-800 text-center mb-1 group-hover:text-yellow-600 transition-colors">{management.bph[0].name}</h3>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full mt-2 mb-4 text-center leading-tight shadow-sm">{management.bph[0].position}</span>
                                    <div className="flex gap-4">
                                        {management.bph[0].linkedin && (
                                            <a href={management.bph[0].linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 group/icon">
                                                <LinkedInIcon />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sekretaris (Kanan) */}
                            <div className="order-3 w-full md:w-64 z-10">
                                <ProfileCard person={management.bph[1]} isBph={true} delay="1.3s" />
                            </div>
                        </div>
                    </div>

                    {/* LEVEL 3: DIVISI & ANGGOTA */}
                    <div className="space-y-16">
                        {management.divisions.map((div, divIdx) => (
                            <div key={divIdx} style={{ animation: `fadeInUp 0.8s ease-out ${1.4 + (divIdx * 0.2)}s both` }} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Header Divisi */}
                                <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 p-6 md:p-8 flex items-center justify-between">
                                    <h3 className="font-extrabold text-2xl text-slate-800 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-blue-600 rounded-full inline-block shadow-sm"></span>
                                        {div.name}
                                    </h3>
                                </div>

                                <div className="p-6 md:p-8">
                                    {/* Kepala Divisi */}
                                    <div className="flex justify-center mb-12">
                                        <div className="w-72">
                                            <ProfileCard person={div.head} isHead={true} delay={`${1.5 + (divIdx * 0.2)}s`} />
                                        </div>
                                    </div>

                                    {/* Anggota */}
                                    {div.members.length > 0 ? (
                                        <>
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="h-px bg-slate-100 flex-1"></div>
                                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full shadow-inner">Anggota Divisi</span>
                                                <div className="h-px bg-slate-100 flex-1"></div>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                                {div.members.map((member, mIdx) => (
                                                    // Animasi cascade untuk tiap anggota berdasar index-nya
                                                    <ProfileCard key={mIdx} person={member} delay={`${1.6 + (divIdx * 0.2) + (mIdx * 0.05)}s`} />
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                            <p className="text-slate-400 text-sm font-medium">Belum ada data anggota untuk divisi ini.</p>
                                        </div>
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
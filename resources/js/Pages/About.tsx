import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Member = {
    id : number;
    full_name : string; 
    linkedin_link : string | null; 
    instagram_link : string | null; 
    division_name : string; 
    position_name: string,
}
type Members = Record<string, Member[]>;

type Period = {
    id: number;
    title: string;
}

type Props = {
    periods: Period[];
    members_page: Members;
}

// --- Komponen Bantuan untuk Ikon Sosial Media ---
const LinkedInIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-instagram w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
    </svg>
);

const ProfileCard = ({ person, isHead = false, isBph = false, isLecturer = false, delay = "0s", description="" }: { person: Member, isHead?: boolean, isBph?: boolean, isLecturer?: boolean, delay?: string, description?: string}) => {
    
    // Inline style untuk trigger animasi fade-in-up per komponen
    const animStyle = {
        animation: `fadeInUp 0.6s ease-out ${delay} both`
    };
    if (person == null){return}
    // Desain Khusus untuk Kepala/Pranata Lab
    if (isLecturer) {
        return (
            <div style={animStyle} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-t-4 border-blue-600 p-8 flex flex-col items-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-150 group-hover:bg-blue-100/50"></div>
                <img
                    src={route('members.photo', person.id)}
                    alt={person.full_name}
                    loading="lazy"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-5 bg-gray-50 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
                />
                <h4 className="font-extrabold text-xl text-slate-800 text-center mb-1">{person.full_name}</h4>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">{person.position_name}</span>
                <p className="text-sm text-slate-600 text-center leading-relaxed mb-6 flex-grow">{description}</p>
                <div className='flex gap-2'>
                    {person.linkedin_link && (
                        <a href={person.linkedin_link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors mt-auto group/icon">
                            <LinkedInIcon />
                        </a>
                    )}
                    {person.instagram_link && (
                        <a href={person.instagram_link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors mt-auto group/icon">
                            <InstagramIcon />
                        </a>
                    )}
                </div>
            </div>
        );
    }

    // Desain untuk Mahasiswa (BPH, Kadiv, Anggota)
    return (
        <div style={animStyle} className={`bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col items-center p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 group ${isHead ? 'ring-1 ring-blue-300' : ''}`}>
            <div className="relative mb-4">
                <img
                    src={route('members.photo', person.id)}
                    alt={person.full_name}
                    loading="lazy"
                    className={`rounded-full object-cover bg-gray-50 transition-transform duration-500 group-hover:scale-110 ${isBph ? 'w-24 h-24 border-4 border-blue-50 shadow-sm' : isHead ? 'w-20 h-20 border-2 border-blue-200 shadow-sm' : 'w-16 h-16 border-2 border-slate-100'}`}
                />
                {/* {isHead && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                        {person.position_name}
                    </span>
                )} */}
            </div>
            <h4 className="font-bold text-center mb-1 text-sm md:text-base text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{person.full_name}</h4>
            <p className={`text-xs text-center mb-4 ${isHead ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap' : 'text-slate-500'}`}>{person.position_name}</p>
            
            {/* Social Links (Hanya LinkedIn) */}
            <div className="flex mt-auto gap-2">
                {person.linkedin_link ? (
                    <a href={person.linkedin_link} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-blue-600 transition-colors group/icon">
                        <LinkedInIcon />
                    </a>
                ) : (
                    <span className="h-5"></span> // Placeholder
                )}
                {person.instagram_link ? (
                    <a href={person.instagram_link} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-blue-600 transition-colors group/icon">
                        <InstagramIcon />
                    </a>
                ) : (
                    <span className="h-5"></span> // Placeholder
                )}
            </div>
        </div>
    );
};

function renderKepalaPranta(members: Member[]){
        return (<div className="mb-20">
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 max-w-4xl mx-auto">
                {members.map((lecturer, idx) => (
                    <div key={lecturer.id} className="w-full md:w-1/2 flex">
                        <div className="w-full">
                            {/* Delay berurutan berdasarkan index */}
                            <ProfileCard person={lecturer} isLecturer={true} delay={`${0.7 + (idx * 0.2)}s`} description={
                                idx==0 ?
                                "Mengawasi, mengarahkan, dan bertanggung jawab penuh atas seluruh kegiatan akademik, riset, serta pengembangan infrastruktur di dalam lingkungan laboratorium."
                                : "Bertanggung jawab atas pengelolaan teknis harian, pemeliharaan infrastruktur jaringan, serta memastikan seluruh perangkat keras dan lunak laboratorium berfungsi optimal."
                            }/>
                        </div>
                    </div>
                ))}
            </div>
        </div>);
    }
const renderBPH = (members: Member[]) => {
        const len = members.length;
        return (
        <>
            {/* Divider Estetik */}
            <div style={{ animation: 'fadeInUp 0.8s ease-out 1s both' }} className="flex items-center justify-center gap-4 mb-16 max-w-md mx-auto opacity-50">
                <div className="h-px bg-slate-300 flex-1"></div>
                <span className="text-slate-400 text-sm font-bold tracking-widest uppercase">Elemen Mahasiswa</span>
                <div className="h-px bg-slate-300 flex-1"></div>
            </div>
            <div className="mb-24 relative">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                    {/* Bendahara (Kiri) */}
                    {len>=2 ? (<div className="order-2 md:order-1 w-full md:w-64 z-10">
                        <ProfileCard person={members[1]} isBph={true} delay="1.2s" />
                    </div>):(<span className="order-2 md:order-1 w-full md:w-64 z-10"></span>)}
                    
                    {/* Ketua (Tengah) - Desain menonjol */}
                    <div className="order-1 md:order-2 w-full md:w-80 transform md:-translate-y-8 z-20" style={{ animation: 'fadeInUp 0.8s ease-out 1.1s both' }}>
                        <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-2xl border-t-4 border-yellow-400 flex flex-col items-center p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-yellow-400/20 group">
                            <div className="relative mb-5">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <img src={route('members.photo', members[0].id)} alt="Ketua" loading="lazy" className="relative w-32 h-32 rounded-full border-4 border-white shadow-md object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                            </div>
                            <h3 className="font-extrabold text-xl text-slate-800 text-center mb-1 group-hover:text-yellow-600 transition-colors">{members[0].full_name}</h3>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full mt-2 mb-4 text-center leading-tight shadow-sm">{members[0].position_name}</span>
                            <div className="flex gap-2">
                                {members[0].linkedin_link && (
                                    <a href={members[0].linkedin_link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 group/icon">
                                        <LinkedInIcon />
                                    </a>
                                )}
                                {members[0].instagram_link && (
                                    <a href={members[0].instagram_link} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-blue-600 transition-colors group/icon">
                                        <InstagramIcon />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sekretaris (Kanan) */}
                    {len>=3 ? (<div className="order-3 w-full md:w-64 z-10">
                        <ProfileCard person={members[2]} isBph={true} delay="1.3s" />
                    </div>):(<span className="order-3 w-full md:w-64 z-10"></span>)}
                    
                </div>
            </div>
        </>);
    }
const renderDivisiComponent = (members: Member[], divIdx: number) => {
    const is_more = members.length >= 2;
    return (
        <div className="p-6 md:p-8">
            {/* Kepala Divisi */}
            <div className="flex justify-center mb-12">
                <div className="w-72">
                    <ProfileCard person={members[0]} isHead={true} delay={`${1.5 + (divIdx * 0.2)}s`} />
                </div>
            </div>

            {/* Anggota */}
            {is_more ? (
                <>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-100 flex-1"></div>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full shadow-inner">Anggota Divisi</span>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {members.slice(1).map((member, mIdx) => (
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
    );
}
const renderDivisions = (members: Members, division_keys: string[]) => {
    return (
        <div className="space-y-16">
            {division_keys.map((division_name, divIdx) => (
                <div key={divIdx} style={{ animation: `fadeInUp 0.8s ease-out ${1.4 + (divIdx * 0.2)}s both` }} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Header Divisi */}
                    <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 p-6 md:p-8 flex items-center justify-between">
                        <h3 className="font-extrabold text-2xl text-slate-800 flex items-center gap-3">
                            <span className="w-2 h-8 bg-blue-600 rounded-full inline-block shadow-sm"></span>
                            {division_name}
                        </h3>
                    </div>
                    {renderDivisiComponent(members[division_name], divIdx)}
                </div>
            ))}
        </div>
    );
}
const renderView = (members: Members) => {
        const keys = Object.keys(members);
        return (
            <>
                {keys.length>=0 && (
                    <React.Fragment key={keys[0]}>
                        {renderKepalaPranta(members[keys[0]])}
                    </React.Fragment>
                )}
                {keys.length>=1 && (
                    <React.Fragment key={keys[1]}>
                        {renderBPH(members[keys[1]])}
                    </React.Fragment> 
                )}
                {keys.length>=2 && (
                    <React.Fragment key={keys[2]}>
                        {renderDivisions(members, keys.slice(2))}
                    </React.Fragment> 
                )}
            </>
        );
    };
export default function About(
    {periods, members_page}:Props
    ) {
    const [members, setMembers] = useState<Members>();
    const [periodId, setPeriodId] = useState<number>();
    useEffect(()=>{
        setPeriodId(periods[periods.length-1].id);
        setMembers(members_page);
    }, [setPeriodId]);
    const changeMembers = async (id: number) => {
        try {
            const res = await axios.get(route("get-members", id));

            setMembers(res.data);   // ⬅ langsung update state
        } catch (err) {
            console.error(err);
        }
    };
    // --- STRUKTUR DATA FULL LAB INFRATEK ---

    // --- Komponen Kartu Profil (Reusable) ---

    const PeriodElement = (periods:Period[])=>{
        return (
            <select
                value={periodId}
                onChange={(e) =>
                    { 
                        const num = Number(e.target.value);
                        setPeriodId(num);
                        changeMembers(num);
                    }
                }
            className="bg-none w-full border-none rounded-xl px-3 py-2 bg-slate-200 text-slate-700 px-5 py-1.5 rounded-full font-bold text-sm cursor-auto hover:cursor-pointer"
            >
              {periods.map((per) => (
                <option key={per.id} value={per.id}>
                  {per.title}
                </option>
              ))}
            </select>
        );
    }
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
                            {PeriodElement(periods)}
                        </div>
                    </div>

                    {members!=null ? renderView(members) : <div>Belum ada Data</div>}

                </section>
            </div>
        </MainLayout>
    );
}
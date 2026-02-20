import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function About() {
  // DATA PENGURUS 2024/2025 (Sesuai SK Terbaru)
  const management = {
    lecturers: [
        {
            name: "Yanuar Nurdiansyah, ST., M.Cs.",
            position: "Kepala Laboratorium",
            image: "/assets/images/struktur_organisasi/yanuar.png",
            linkedin: "https://www.linkedin.com/in/yanuar-nurdiansyah"
        },
        {
            name: "Widya Dwinoto Darmawan, ST",
            position: "Pranata Laboratorium",
            image: "/assets/images/struktur_organisasi/widy.png",
            linkedin: ""
        }
    ],
    leaders: [
        {
            name: "Yuan",
            position: "Ketua Laboratorium", // Ketua dari unsur Mahasiswa
            image: "https://ui-avatars.com/api/?name=Yuan&background=0D8ABC&color=fff",
        },
        {
            name: "C. Maretha",
            position: "Sekretaris",
            image: "https://ui-avatars.com/api/?name=Maretha&background=0D8ABC&color=fff",
        },
        {
            name: "C. Mu'iz",
            position: "Bendahara",
            image: "https://ui-avatars.com/api/?name=Muiz&background=0D8ABC&color=fff",
        }
    ],
    divisions: [
        {
            name: "Divisi Penelitian",
            head: "Widya",
            members: ["Abila", "GIG"]
        },
        {
            name: "Divisi Pengembangan Ilmu",
            head: "Farah",
            members: ["Rafky", "Nafi' Nadilia", "Thobiq", "Eggy", "Farel", "Raffi", "Fairuz", "Febrianto", "Ozi", "Rayhan", "Edwin", "Elsa", "Dina", "Ica"]
        },
        {
            name: "Divisi Mediatek",
            head: "Mita",
            members: []
        }
    ]
  };

  return (
    <MainLayout>
      <Head title="Tentang Kami - Lab Infratek" />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        
        {/* HERO HEADER */}
        <section className="pt-32 pb-12 text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Tentang Kami
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Mengenal lebih dekat visi, misi, dan orang-orang hebat di balik Laboratorium Infrastruktur Teknologi.
            </p>
        </section>

        {/* VISI & MISI */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-150"></div>
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 relative z-10">Visi</h2>
                    <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                        "Menjadi Laboratorium yang unggul dan aktif di bidang pengembangan teknologi serta menjadi sarana praktikum untuk menunjang kompetensi yang dimiliki."
                    </p>
                </div>
                
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-blue-800 px-4">Misi</h2>
                    <ul className="space-y-4">
                        {[
                            "Meningkatkan kompetensi mahasiswa di bidang sistem operasi dan jaringan.",
                            "Mengembangkan potensi kemampuan mahasiswa melalui praktikum terstruktur.",
                            "Meningkatkan kualitas SDM dan budaya kerja terkait infrastruktur TI."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 hover:translate-x-2 transition-transform">
                                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </span>
                                <p className="text-gray-700">{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>

        {/* STRUKTUR ORGANISASI (ORG CHART) */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Struktur Organisasi</h2>
                <p className="text-blue-600 font-semibold">Periode 2024 / 2025</p>
            </div>

            {/* LEVEL 1: KEPALA & PRANATA (DOSEN/STAFF) */}
            <div className="flex flex-wrap justify-center gap-8 mb-16 relative z-10">
                {management.lecturers.map((person, idx) => (
                    <div key={idx} className="w-full max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-600 transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="h-32 bg-gradient-to-b from-blue-600 to-blue-400"></div>
                        <div className="px-6 pb-6 -mt-16 text-center">
                            <img 
                                src={person.image} 
                                alt={person.name} 
                                className="w-32 h-32 rounded-full border-4 border-white mx-auto shadow-lg object-cover bg-white"
                            />
                            <h3 className="mt-4 text-xl font-bold text-gray-800">{person.name}</h3>
                            <p className="text-blue-600 font-medium text-sm mb-3">{person.position}</p>
                            {person.linkedin && (
                                <a href={person.linkedin} target="_blank" className="text-gray-400 hover:text-blue-700 transition-colors">
                                    <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* LEVEL 2: KETUA LAB (MAHASISWA) */}
            <div className="flex justify-center mb-12 relative">
                {/* Garis Konektor Vertical */}
                <div className="absolute -top-16 left-1/2 w-px h-16 bg-gray-300 -z-0"></div>
                
                <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center relative z-10">
                    <img src={management.leaders[0].image} alt="Ketua" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-50 bg-gray-100"/>
                    <h3 className="font-bold text-lg text-gray-800">{management.leaders[0].name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{management.leaders[0].position}</span>
                </div>
            </div>

            {/* LEVEL 3: BPH (SEKRETARIS & BENDAHARA) */}
            <div className="flex flex-wrap justify-center gap-8 mb-20 relative">
                <div className="absolute -top-12 left-1/2 w-px h-12 bg-gray-300 -z-0"></div>
                {/* Garis Horizontal */}
                <div className="absolute -top-0 left-1/4 right-1/4 h-px bg-gray-300 -z-0 hidden md:block"></div>

                {management.leaders.slice(1).map((person, idx) => (
                    <div key={idx} className="w-64 bg-white rounded-xl shadow p-6 text-center border-t-4 border-yellow-400 relative z-10">
                         {/* Garis Konektor Kecil ke atas */}
                        <div className="absolute -top-6 left-1/2 w-px h-6 bg-gray-300 md:block hidden"></div>
                        <img src={person.image} alt={person.name} className="w-20 h-20 rounded-full mx-auto mb-3 bg-gray-100"/>
                        <h4 className="font-bold text-gray-800">{person.name}</h4>
                        <p className="text-gray-500 text-sm">{person.position}</p>
                    </div>
                ))}
            </div>

            {/* LEVEL 4: DIVISI & ANGGOTA */}
            <div className="grid md:grid-cols-3 gap-8">
                {management.divisions.map((div, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-gray-50 p-4 border-b border-gray-200 text-center">
                            <h3 className="font-bold text-lg text-blue-800">{div.name}</h3>
                        </div>
                        <div className="p-6">
                            {/* KADIV */}
                            <div className="mb-6 text-center">
                                <div className="inline-block relative">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${div.head}&background=random`} 
                                        className="w-16 h-16 rounded-full mx-auto border-2 border-blue-500 p-1"
                                    />
                                    <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">KADIV</span>
                                </div>
                                <p className="font-semibold mt-2">{div.head}</p>
                            </div>
                            
                            {/* ANGGOTA LIST */}
                            {div.members.length > 0 ? (
                                <div className="flex flex-wrap justify-center gap-2">
                                    {div.members.map((member, mIdx) => (
                                        <span key={mIdx} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                                            {member}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-400 text-sm italic">Data anggota belum diupdate</p>
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
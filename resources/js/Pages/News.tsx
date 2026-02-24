import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function News() {
  // INI DUMMY DATA
  const dummyNews = [
    {
      id: 1,
      title: "Kegiatan Pelatihan Jaringan Komputer Dasar",
      slug: "pelatihan-jarkom-dasar",
      date: "12 Februari 2026",
      author: "Admin Infratek",
      excerpt: "Laboratorium Infratek mengadakan pelatihan jaringan komputer dasar untuk mahasiswa semester awal guna mengenalkan konsep routing dan switching...",
      thumbnail: "/assets/images/gallery/1.jpg"
    },
    {
      id: 2,
      title: "Kunjungan Industri ke Data Center Surabaya",
      slug: "kunjungan-industri-data-center",
      date: "10 Februari 2026",
      author: "Humas",
      excerpt: "Mahasiswa konsentrasi Jaringan Komputer melakukan kunjungan studi ke salah satu Data Center terbesar di Surabaya untuk melihat infrastruktur server...",
      thumbnail: "/assets/images/gallery/2.jpg"
    },
    {
      id: 3,
      title: "Update Perangkat Keras Laboratorium 2026",
      slug: "update-hardware-2026",
      date: "05 Januari 2026",
      author: "Kepala Lab",
      excerpt: "Demi menunjang perkuliahan Sistem Operasi, Laboratorium Infratek kini dilengkapi dengan PC spesifikasi terbaru ryzen series...",
      thumbnail: "/assets/images/gallery/3.jpg"
    },
    {
      id: 4,
      title: "Open Recruitment Asisten Laboratorium 2026",
      slug: "oprec-asisten-2026",
      date: "01 Januari 2026",
      author: "Koordinator Asisten",
      excerpt: "Dibuka kesempatan bagi mahasiswa angkatan 2024 dan 2025 untuk bergabung menjadi bagian dari keluarga besar asisten laboratorium Infratek...",
      thumbnail: "/assets/images/gallery/4.jpg"
    }
  ];

  return (
    <MainLayout>
      <Head title="Berita & Artikel - Lab Infratek" />

      {/* INJEKSI CSS ANIMASI */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card {
          animation: fadeInUp 0.7s ease-out both;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-sans pb-24">
        
        {/* Header Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white border-b border-slate-100">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative max-w-7xl mx-auto text-center" style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              Update Terkini
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              Berita & <span className="text-blue-600">Artikel</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Eksplorasi kegiatan, inovasi, dan pengumuman terbaru dari Laboratorium Infrastruktur Teknologi.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyNews.map((news, index) => (
              <div 
                key={news.id} 
                className="animate-card group bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Thumbnail Image */}
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent z-10 transition-colors"></div>
                  <img 
                    src={news.thumbnail} 
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Infratek+News' }}
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg shadow-blue-600/50">
                      Infratek Info
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {news.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      {news.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                    <Link href={`/news/${news.slug}`}>
                      {news.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <Link 
                      href={`/news/${news.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:text-indigo-600 transition-all group/link"
                    >
                      Baca Selengkapnya
                      <svg className="w-4 h-4 transform transition-transform group-hover/link:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Modern */}
          <div className="flex justify-center mt-16 items-center gap-2" style={{ animation: 'fadeInUp 0.8s ease-out 1s both' }}>
            <button className="w-10 h-10 flex items-center justify-center text-slate-400 rounded-xl hover:bg-white hover:text-blue-600 transition-all border border-transparent hover:border-slate-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/40">1</button>
            <button className="w-10 h-10 flex items-center justify-center bg-white text-slate-600 rounded-xl font-bold border border-slate-100 hover:border-blue-400 hover:text-blue-600 transition-all">2</button>
            <button className="w-10 h-10 flex items-center justify-center bg-white text-slate-600 rounded-xl font-bold border border-slate-100 hover:border-blue-400 hover:text-blue-600 transition-all">3</button>
            <button className="w-10 h-10 flex items-center justify-center text-slate-600 rounded-xl hover:bg-white hover:text-blue-600 transition-all border border-transparent hover:border-slate-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {NewsGuest} from '@/SharedType';
import {getLocalTime} from '@/Utils';



// --- Komponen Bantuan Ikon SVG ---
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
);

const FocusIcons = [
  <svg className="w-8 h-8 text-blue-300 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
  <svg className="w-8 h-8 text-indigo-300 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>,
  <svg className="w-8 h-8 text-cyan-300 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>,
  <svg className="w-8 h-8 text-blue-300 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
];

type Props = {
  latestNews: NewsGuest[]
}

export default function Home(
  {latestNews}: Props
) {
  return (
    <MainLayout>
      <Head title="Home - Lab Infratek" />

      {/* INJEKSI CSS ANIMASI */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-sans overflow-hidden">
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-24 pb-20 sm:pt-36 sm:pb-32 px-4 sm:px-6 flex items-center justify-center min-h-[90vh]">
          {/* Background Animasi & Grid */}
          <div className="absolute inset-0 bg-slate-50 bg-grid-pattern pointer-events-none z-0"></div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 font-bold text-sm tracking-wide shadow-sm backdrop-blur-sm">
                Fakultas Ilmu Komputer - Universitas Jember
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-4 tracking-tight text-slate-900 drop-shadow-sm">
                Laboratorium <br className="hidden sm:block"/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                  Infrastruktur Teknologi
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 mt-6 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                Pusat riset, praktikum, dan pengembangan inovasi di bidang Jaringan Komputer & Sistem Operasi.
              </p>
              
              {/* SHORTCUT MENU */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
                <Link 
                  href="/gallery" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Lihat Galeri <ArrowIcon />
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200 rounded-full font-bold shadow-md hover:bg-white hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 flex items-center justify-center"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SEKILAS TENTANG (Video Profil & Deskripsi) */}
        <section className="py-24 px-6 bg-white relative z-10 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Description */}
                <div className="space-y-8 order-2 lg:order-1" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
                      Mengenal <span className="text-blue-600">INFRATEK</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"></div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-lg text-justify">
                    Laboratorium Infrastruktur Teknologi (INFRATEK) berfokus pada pengembangan kompetensi teknis mahasiswa khususnya di bidang <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Jaringan Komputer</span> dan <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Sistem Operasi</span>.
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600">
                    <p className="text-slate-700 leading-relaxed italic">
                      "Kami berkomitmen mencetak talenta digital yang siap menghadapi tantangan industri melalui praktikum berbasis studi kasus nyata, riset mendalam, dan pengabdian kepada masyarakat."
                    </p>
                  </div>

                  <Link href="/about" className="inline-flex items-center text-blue-600 font-bold text-lg hover:text-indigo-600 transition-colors group">
                    Pelajari lebih lanjut tentang kami
                    <ArrowIcon />
                  </Link>
                </div>

                {/* Video / Image Area */}
                <div className="order-1 lg:order-2" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
                  <div className="relative group rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white bg-slate-100 transform transition-transform duration-500 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                    <div className="aspect-video relative z-0">
                      <iframe
                        src="https://drive.google.com/file/d/1NqLQRuKgSbMU847hw6hhs9eLYbUC7QYe/preview"
                        className="w-full h-full object-cover"
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* 3. BERITA TERBARU (Widget) */}
        <section className="py-24 px-6 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
                <h2 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">Berita & Kegiatan</h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
              </div>
              <Link href="/news" className="hidden md:flex items-center text-blue-600 hover:text-blue-800 font-bold transition-colors group">
                Lihat Semua Publikasi <ArrowIcon />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((news, idx) => (
                <div key={news.id} style={{ animation: `fadeInUp 0.8s ease-out ${0.2 * (idx+1)}s both` }} className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
                  {/* Thumbnail Container */}
                  <div className="relative h-56 overflow-hidden bg-slate-200">
                    {<img 
                      src={news.thumbnail!=null ? route('news.tumbnail', news.thumbnail.id) : 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found'} 
                      alt={news.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found' }} // Fallback if image breaks
                    />}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                      TERBARU
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <p className="text-sm text-slate-500 font-medium">{getLocalTime(news.created_at, true)}</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      <Link href={route('news.detail', {
                        news:news.id,
                        from: window.location.href,
                      })}>
                        {news.title}
                      </Link>
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {news.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <Link 
                        href={route('news.detail', {
                        news:news.id,
                        from: window.location.href,
                      })}
                        className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:text-indigo-600 transition-colors group/link"
                      >
                        Baca selengkapnya
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile View All Button */}
            <div className="mt-10 text-center md:hidden">
              <Link href="/news" className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors">
                Lihat Semua Publikasi
              </Link>
            </div>
          </div>
        </section>

        {/* 4. MATA KULIAH / FOKUS PEMBELAJARAN */}
        <section className="py-24 px-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
             
             <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-16" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Fokus Keilmuan & Pembelajaran</h2>
                  <p className="text-blue-200 max-w-2xl mx-auto">Area spesialisasi yang menjadi pilar utama praktikum dan riset di laboratorium kami.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['Sistem Operasi', 'Jaringan Komputer', 'Manajemen Jaringan', 'Routing & Switching'].map((item, idx) => (
                    <div key={idx} style={{ animation: `fadeInUp 0.8s ease-out ${0.2 * idx}s both` }} className="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 text-center">
                       {FocusIcons[idx]}
                       <h3 className="font-bold text-xl text-white tracking-wide">{item}</h3>
                    </div>
                  ))}
                </div>
             </div>
        </section>

        {/* 5. BOTTOM SHORTCUT (Call to Action Terakhir) */}
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2.5rem] p-10 sm:p-16 shadow-2xl text-white relative overflow-hidden text-center transform hover:scale-[1.01] transition-transform duration-500">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">Siap Berkolaborasi?</h2>
                <p className="text-blue-100 mb-10 text-lg sm:text-xl relative z-10 max-w-2xl mx-auto font-medium">
                  Jangan ragu untuk menghubungi kami, berdiskusi mengenai riset, atau berkunjung langsung ke fasilitas Infratek.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    <Link href="/contact" className="px-10 py-4 bg-white text-blue-700 font-extrabold rounded-full shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Hubungi Kami Sekarang
                    </Link>
                </div>
            </div>
        </section>

      </div>
    </MainLayout>
  );
}
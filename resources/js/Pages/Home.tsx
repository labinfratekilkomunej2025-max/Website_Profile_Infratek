import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Home() {
  // DATA DUMMY: 3 Berita Terbaru untuk Widget
  const latestNews = [
    {
      id: 1,
      title: "Kegiatan Pelatihan Jaringan Komputer Dasar",
      date: "12 Februari 2026",
      thumbnail: "/assets/images/gallery/1.jpg",
      slug: "pelatihan-jarkom-dasar"
    },
    {
      id: 2,
      title: "Kunjungan Industri ke Data Center Surabaya",
      date: "10 Februari 2026",
      thumbnail: "/assets/images/gallery/2.jpg",
      slug: "kunjungan-industri-data-center"
    },
    {
      id: 3,
      title: "Update Perangkat Keras Laboratorium 2026",
      date: "05 Januari 2026",
      thumbnail: "/assets/images/gallery/3.jpg",
      slug: "update-hardware-2026"
    }
  ];

  return (
    <MainLayout>
      <Head title="Home - Lab Infratek" />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
        
        {/* 1. HERO SECTION (Banner Besar) */}
        <section className="relative pt-20 pb-20 sm:pt-32 sm:pb-32 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute w-96 h-96 top-1/2 -left-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent px-2 leading-tight">
                Laboratorium Infrastruktur Teknologi
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-2 font-light">INFRATEK</p>
              <p className="text-base sm:text-lg text-gray-500 mb-8">
                Fakultas Ilmu Komputer - Universitas Jember
              </p>
              
              {/* 4. SHORTCUT MENU (Tombol Cepat di Hero) */}
              <div className="flex justify-center gap-4 animate-slide-up delay-100">
                <Link 
                  href="/gallery" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Lihat Galeri
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-full font-semibold shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SEKILAS TENTANG (Video Profil & Deskripsi) */}
        <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Video / Image Area */}
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all"></div>
                  <div className="aspect-video bg-gray-900">
                    <iframe
                      src="https://drive.google.com/file/d/1NqLQRuKgSbMU847hw6hhs9eLYbUC7QYe/preview"
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Text Description */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Tentang <span className="text-blue-600">INFRATEK</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Laboratorium Infrastruktur Teknologi (INFRATEK) berfokus pada pengembangan kompetensi di bidang <span className="font-semibold text-blue-600">Jaringan Komputer</span> dan <span className="font-semibold text-blue-600">Sistem Operasi</span>.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Kami berkomitmen mencetak talenta digital yang siap menghadapi tantangan industri melalui praktikum berbasis studi kasus nyata, riset mendalam, dan pengabdian kepada masyarakat.
                  </p>
                  <Link href="/contact" className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all">
                    Selengkapnya tentang kami
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
             </div>
          </div>
        </section>

        {/* 3. BERITA TERBARU (Widget) - NEW FEATURE */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Berita Terbaru</h2>
                <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
              </div>
              <Link href="/news" className="hidden sm:block text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Lihat Semua Berita &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <div key={news.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-blue-50">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.thumbnail} 
                      alt={news.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      NEW
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-blue-500 mb-2 font-medium">{news.date}</p>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      <Link href={`/news/${news.slug}`}>
                        {news.title}
                      </Link>
                    </h3>
                    <Link 
                      href={`/news/${news.slug}`}
                      className="text-sm font-semibold text-gray-500 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      Baca selengkapnya
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/news" className="text-blue-600 font-semibold">
                Lihat Semua Berita &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* MATA KULIAH & VISI MISI (Tetap disimpan sebagai pelengkap) */}
        <section className="py-16 px-6 bg-blue-900 text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern.png')]"></div>
             <div className="relative max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Fokus Pembelajaran</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Sistem Operasi', 'Jaringan Komputer', 'Manajemen Jaringan', 'Routing & Switching'].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                       <h3 className="font-semibold text-lg">{item}</h3>
                    </div>
                  ))}
                </div>
             </div>
        </section>

        {/* 4. BOTTOM SHORTCUT (Call to Action Terakhir) */}
        <section className="py-20 px-6 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">Tertarik bergabung atau bekerjasama?</h2>
                <p className="text-blue-100 mb-8 text-lg relative z-10">Jangan ragu untuk menghubungi kami atau berkunjung langsung ke laboratorium.</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    <Link href="/contact" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                        Hubungi Kami Sekarang
                    </Link>
                </div>
            </div>
        </section>

      </div>
    </MainLayout>
  );
}
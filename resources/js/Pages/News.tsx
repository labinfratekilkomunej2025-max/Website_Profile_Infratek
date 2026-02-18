import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function News() {
  // INI DUMMY DATA (Data Palsu pengganti Database)
  const dummyNews = [
    {
      id: 1,
      title: "Kegiatan Pelatihan Jaringan Komputer Dasar",
      slug: "pelatihan-jarkom-dasar",
      date: "12 Februari 2026",
      author: "Admin Infratek",
      excerpt: "Laboratorium Infratek mengadakan pelatihan jaringan komputer dasar untuk mahasiswa semester awal guna mengenalkan konsep routing dan switching...",
      thumbnail: "/assets/images/gallery/1.jpg" // Kita pinjam foto galeri dulu
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
      <Head title="Berita - Lab Infratek" />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
        {/* Header Section */}
        <section className="relative pt-32 pb-12 px-6 overflow-hidden">
          <div className="relative max-w-7xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Berita & Artikel
            </h1>
            <p className="text-lg text-gray-600">
              Informasi terbaru seputar kegiatan Laboratorium Infratek
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6 shadow-lg shadow-blue-500/50"></div>
          </div>
        </section>

        {/* News Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyNews.map((news, index) => (
              <div 
                key={news.id} 
                className="group bg-white rounded-2xl shadow-lg border border-blue-50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <img 
                    src={news.thumbnail} 
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Category Badge (Opsional) */}
                  <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Berita
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {news.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      {news.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/news/${news.slug}`}>
                      {news.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>

                  <Link 
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Baca Selengkapnya
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dummy */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">Prev</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30">1</button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-4 py-2 bg-white text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50">Next</button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
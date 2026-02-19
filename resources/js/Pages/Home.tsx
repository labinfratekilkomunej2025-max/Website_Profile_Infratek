
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { NavbarPropsHome } from '@/types';
import { Head } from '@inertiajs/react';


export default function Home({
  CurrentPath,
  KepalaPhotoPath,
  PranataPhotoPath,
}: NavbarPropsHome
) {
  const storageUrl: string = window.appConfig.storageUrl;
  return (
    <>
    <Head title="Home" />
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Navbar 
        CurrentPath={CurrentPath}
        // HomePath={HomePath}
        // GalleryPath={GalleryPath}
        // ContactPath={ContactPath}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 top-1/2 -left-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent px-2">
              Laboratorium Infrastruktur Teknologi
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-2">INFRATEK</p>
            <p className="text-base sm:text-lg text-gray-500 px-4">
              Fakultas Ilmu Komputer - Universitas Jember
            </p>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6 shadow-lg shadow-blue-500/50"></div>
          </div>

          {/* Video Profile Section */}
          <div className="mb-12 sm:mb-16 animate-slide-up delay-100">
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src="https://drive.google.com/file/d/1NqLQRuKgSbMU847hw6hhs9eLYbUC7QYe/preview"
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4 sm:p-6 text-center bg-gradient-to-br from-white to-blue-50">
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      Profil Laboratorium INFRATEK
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      Video pengenalan Lab Infrastruktur Teknologi
                    </p>
                  </div>
                  {/* Decorative Corners */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-blue-400/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16"></div>
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-blue-400/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16"></div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-blue-400/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16"></div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-blue-400/50 transition-all duration-300 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Title Section */}
          <div className="text-center mb-8 sm:mb-12 animate-slide-up delay-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Tim Laboratorium
              </h2>
            </div>
            <p className="text-gray-600 text-base sm:text-lg px-4">
              Kepala Laboratorium dan Pranata Laboratorium INFRATEK
            </p>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4 shadow-lg shadow-blue-500/30"></div>
          </div>

          {/* Team Section - Kepala Lab & Pranata Lab */}
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20 flex-wrap px-2">
            {/* Kepala Lab */}
            <div className="group relative w-full sm:w-80 lg:w-96 animate-slide-up delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30">
                {/* Photo Container - 1:1 Aspect Ratio */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                  <div className="relative w-full h-full">
                    <img
                        src={KepalaPhotoPath}
                        alt={`Yanuar Nurdiansyah`}
                        className="absolute inset-0 w-full h-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 384px"
                    />
                </div>
                  {/* <Image
                    src="/assets/images/struktur_organisasi/yanuar.png"
                    alt="Yanuar Nurdiansyah"
                    fill
                    className="object-cover"
                    
                  /> */}
                  {/* Decorative Corners */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-white/50"></div>
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-white/50"></div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-white/50"></div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-white/50"></div>
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-full mb-3 shadow-lg shadow-blue-500/30">
                    KEPALA LABORATORIUM
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Yanuar Nurdiansyah, ST., M.Cs.
                  </h3>
                </div>
              </div>
            </div>

            {/* Pranata Lab */}
            <div className="group relative w-full sm:w-80 lg:w-96 animate-slide-up delay-400">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30">
                {/* Photo Container - 1:1 Aspect Ratio */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
                   <div className="relative w-full h-full">
                    <img
                        src={PranataPhotoPath}
                        alt={`Widya Dwinoto Darmawan`}
                        className="absolute inset-0 w-full h-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 384px"
                    />
                </div>
                  {/* Decorative Corners */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-white/50"></div>
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-white/50"></div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-white/50"></div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-white/50"></div>
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-full mb-3 shadow-lg shadow-blue-500/30">
                    PRANATA LABORATORIUM
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Widya Dwinoto Darmawan, ST
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 mb-16 border border-blue-100 relative overflow-hidden group hover:shadow-blue-500/20 transition-all duration-500 animate-slide-up delay-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-all duration-700"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Tentang Laboratorium
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-6">
                Laboratorium Infrastruktur Teknologi (INFRATEK) adalah salah
                satu laboratorium yang berada di{" "}
                <span className="font-semibold text-blue-600">
                  Fakultas Ilmu Komputer Universitas Jember
                </span>
                . Laboratorium ini berfokus pada pengembangan kompetensi di
                bidang{" "}
                <span className="font-semibold text-blue-600">
                  Jaringan Komputer
                </span>{" "}
                dan{" "}
                <span className="font-semibold text-blue-600">
                  Sistem Operasi
                </span>
                .
              </p>
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6">
                INFRATEK memiliki peran penting dalam mendukung kegiatan
                akademik melalui{" "}
                <span className="font-semibold text-gray-700">penelitian</span>,{" "}
                <span className="font-semibold text-gray-700">
                  pengabdian masyarakat
                </span>
                , serta bertugas sebagai{" "}
                <span className="font-semibold text-gray-700">
                  asisten praktikum dan pengajar
                </span>{" "}
                dalam berbagai mata kuliah terkait infrastruktur teknologi
                informasi.
              </p>
              <p className="text-gray-600 text-center max-w-3xl mx-auto">
                Dengan dukungan peralatan canggih dan tim yang berpengalaman,
                INFRATEK berkomitmen untuk menghasilkan lulusan yang kompeten
                dan siap menghadapi tantangan industri teknologi informasi.
              </p>
            </div>
          </div>

          {/* Visi Misi Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="relative group animate-slide-up delay-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Visi
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-justify">
                  Menjadi Laboratorium yang unggul dan aktif di bidang
                  pengembangan teknologi serta menjadi sarana praktikum untuk
                  menunjang kompetensi yang dimiliki.
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="relative group animate-slide-up delay-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-lg shadow-blue-600/30">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Misi
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg shadow-blue-500/30">
                      1
                    </span>
                    <span className="leading-relaxed">
                      Meningkatkan kompetensi mahasiswa di bidang sistem operasi
                      dan jaringan melalui kegiatan praktikum yang profesional
                      dan berkualitas.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg shadow-blue-500/30">
                      2
                    </span>
                    <span className="leading-relaxed">
                      Mengembangkan potensi kemampuan mahasiswa dalam
                      menggunakan sistem operasi dan jaringan melalui kegiatan
                      praktikum yang terstruktur.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shadow-lg shadow-blue-500/30">
                      3
                    </span>
                    <span className="leading-relaxed">
                      Meningkatkan kualitas sumber daya manusia dan meningkatkan
                      budaya kerja, terutama yang berkaitan di bidang sistem
                      operasi dan jaringan.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mata Kuliah Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 mt-16 border border-blue-100 relative overflow-hidden group hover:shadow-blue-500/20 transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Mata Kuliah
                  </h2>
                </div>
                <p className="text-gray-600">
                  Mata kuliah yang berada dalam naungan LAB INFRATEK
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Sistem Operasi",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "Jaringan Komputer",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "Desain dan Management Jaringan",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "Routing and Switching",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                  },
                ].map((course, index) => (
                  <div key={index} className="group/card relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover/card:scale-110 transition-all duration-300">
                          {course.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover/card:text-blue-600 transition-colors duration-300">
                          {course.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

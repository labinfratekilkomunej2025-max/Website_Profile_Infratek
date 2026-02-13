"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Navbar />

      {/* Contact Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 top-1/4 right-1/4 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 bottom-1/4 left-1/4 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent px-2">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Hubungi kami untuk informasi lebih lanjut
            </p>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6 shadow-lg shadow-blue-500/50"></div>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Email Card */}
            <div className="group relative animate-slide-up delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-blue-100 hover:shadow-blue-500/20 transition-all duration-500">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-all duration-300">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      Email
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                      Kirim email kepada kami
                    </p>
                    <a
                      href="mailto:infratek@unej.ac.id"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-300 text-sm sm:text-base break-words"
                    >
                      labinfratekilkomunej@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="group relative animate-slide-up delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-green-100 hover:shadow-green-500/20 transition-all duration-500">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-green-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl shadow-green-500/30 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                      Hubungi kami via WhatsApp
                    </p>
                    <a
                      href="https://wa.me/6281216519331"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-all duration-300 text-sm sm:text-base"
                    >
                      +62 812-1651-9331
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Card - Full Width */}
          <div className="group relative mb-8 sm:mb-12 animate-slide-up delay-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 hover:shadow-blue-500/20 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Alamat
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 mb-2">
                    Laboratorium Infrastruktur Teknologi
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2">
                    Fakultas Ilmu Komputer
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2">
                    Universitas Jember
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                    Jl. Kalimantan No. 37, Kampus Tegalboto, Jember 68121
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="group relative animate-slide-up delay-400">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 hover:shadow-blue-500/20 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-600/30 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Jam Operasional
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-blue-50 p-3 sm:p-4 rounded-xl gap-1 sm:gap-0">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          Senin - Jumat
                        </span>
                        <span className="text-blue-600 font-bold text-sm sm:text-base">
                          08.00 - 16.00
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-100 p-3 sm:p-4 rounded-xl gap-1 sm:gap-0">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          Sabtu
                        </span>
                        <span className="text-red-500 font-bold text-sm sm:text-base">
                          Tutup
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-100 p-3 sm:p-4 rounded-xl gap-1 sm:gap-0">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          Minggu
                        </span>
                        <span className="text-red-500 font-bold text-sm sm:text-base">
                          Tutup
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-100 p-3 sm:p-4 rounded-xl gap-1 sm:gap-0">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          Hari Libur
                        </span>
                        <span className="text-red-500 font-bold text-sm sm:text-base">
                          Tutup
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

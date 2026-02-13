
import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { NavbarProps } from '@/types';
import { Head } from '@inertiajs/react';
export default function Gallery(
  {
    CurrentPath,
    HomePath,
    GalleryPath,
    ContactPath,
  }: NavbarProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    
    const itemsPerPage = 9;
    const totalItems = 13; // Total gambar yang tersedia
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = Array.from(
      { length: endIndex - startIndex },
      (_, i) => startIndex + i + 1
    );
    
    return (
    <>  
    <Head title="Gallery" />
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Navbar 
        CurrentPath={CurrentPath}
        HomePath={HomePath}
        GalleryPath={GalleryPath}
        ContactPath={ContactPath}
      />

      {/* Gallery Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 top-1/2 -left-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              Gallery
            </h1>
            <p className="text-xl text-gray-600">
              Dokumentasi kegiatan dan fasilitas Laboratorium INFRATEK
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6 shadow-lg shadow-blue-500/50"></div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentItems.map((imageNumber, index) => (
              <div
                key={imageNumber}
                className={`relative group cursor-pointer animate-slide-up delay-${Math.min(
                  index * 100,
                  600
                )}`}
                onMouseEnter={() => setHoveredCard(imageNumber)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-110"></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
                  {/* Image Container - 16:9 Aspect Ratio */}
                  <div className="relative w-full aspect-video bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                    {/* Gallery Image */}
                    <div className="relative w-full h-full">
                      <img
                          src={`http://127.0.0.1:8000/storage/gallery/${imageNumber}.jpg`}
                          alt={`Yanuar Nurdiansyah`}
                          className="absolute inset-0 w-full h-full object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 384px"
                      />
                    </div>
                    {/* <Image
                      src={`/assets/images/gallery/${imageNumber}.jpg`}
                      alt={`Gallery Image ${imageNumber}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    /> */}

                    {/* Decorative Neon Frame */}
                    <div className="absolute inset-0 border-4 border-white/30 group-hover:border-white/50 transition-all duration-300"></div>
                    <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-white/60 group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>
                    <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-white/60 group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>
                    <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-white/60 group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>
                    <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-white/60 group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                      <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Gallery Image {imageNumber}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Dokumentasi kegiatan laboratorium infrastruktur teknologi
                    </p>
                  </div>

                  {/* Bottom Neon Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 shadow-lg shadow-blue-500/50"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-110"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
                    }`}
                  >
                    {page}
                    {currentPage === page && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></span>
                    )}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

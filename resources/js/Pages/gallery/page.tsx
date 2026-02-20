import { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

// Interface untuk data galeri (Simulasi model database)
interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image_url: string; // Bisa path lokal atau URL storage
    is_public: number; // 1 = Public, 0 = Private
}

export default function Gallery() {
    // --- 1. DATA DUMMY (Simulasi Database) ---
    // Nanti diganti dengan props dari controller Laravel
    const dummyGalleries: GalleryItem[] = [
        { id: 1, title: "Kegiatan Pelatihan", description: "Dokumentasi kegiatan pelatihan jarkom", image_url: "/assets/images/gallery/1.jpg", is_public: 1 },
        { id: 2, title: "Kunjungan Industri", description: "Kunjungan ke Data Center", image_url: "/assets/images/gallery/2.jpg", is_public: 1 },
        { id: 3, title: "Rapat Kerja", description: "Rapat kerja pengurus lab", image_url: "/assets/images/gallery/3.jpg", is_public: 1 },
        { id: 4, title: "Dokumentasi Lab", description: "Suasana praktikum", image_url: "/assets/images/gallery/4.jpg", is_public: 1 },
        { id: 5, title: "Internal Meeting", description: "Rapat internal (Private)", image_url: "/assets/images/gallery/5.jpg", is_public: 0 }, // HIDDEN
        { id: 6, title: "Workshop", description: "Workshop Mikrotik", image_url: "/assets/images/gallery/6.jpg", is_public: 1 },
        { id: 7, title: "Seminar Nasional", description: "Seminar teknologi", image_url: "/assets/images/gallery/7.jpg", is_public: 1 },
        { id: 8, title: "Lomba Jarkom", description: "Lomba jaringan antar mahasiswa", image_url: "/assets/images/gallery/8.jpg", is_public: 1 },
        { id: 9, title: "Makrab", description: "Malam keakraban anggota", image_url: "/assets/images/gallery/9.jpg", is_public: 1 },
        { id: 10, title: "Foto Bersama", description: "Foto keluarga besar lab", image_url: "/assets/images/gallery/10.jpg", is_public: 1 },
        { id: 11, title: "Arsip Lama", description: "Dokumen lama (Private)", image_url: "/assets/images/gallery/11.jpg", is_public: 0 }, // HIDDEN
        { id: 12, title: "Kegiatan Harian", description: "Kegiatan sehari-hari di lab", image_url: "/assets/images/gallery/12.jpg", is_public: 1 },
        { id: 13, title: "Inventaris", description: "Pengecekan alat", image_url: "/assets/images/gallery/13.jpg", is_public: 1 },
    ];

    // --- 2. FILTER LOGIC: Hanya ambil yang is_public = 1 ---
    const publicGalleries = dummyGalleries.filter(item => item.is_public === 1);

    // --- 3. PAGINATION LOGIC ---
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null); // State hover lama kamu
    const itemsPerPage = 9;
    const totalItems = publicGalleries.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    // Ambil data untuk halaman saat ini
    const currentItems = publicGalleries.slice(startIndex, startIndex + itemsPerPage);


    // --- 4. LIGHTBOX LOGIC (POPUP) ---
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const isOpen = lightboxIndex !== null;

    const openLightbox = (itemId: number) => {
        // Cari index asli gambar di dalam array publicGalleries yang terfilter
        const realIndex = publicGalleries.findIndex(img => img.id === itemId);
        setLightboxIndex(realIndex);
    };

    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = useCallback(() => {
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! + 1) % publicGalleries.length);
        }
    }, [lightboxIndex, publicGalleries.length]);

    const prevImage = useCallback(() => {
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! - 1 + publicGalleries.length) % publicGalleries.length);
        }
    }, [lightboxIndex, publicGalleries.length]);

    // Keyboard Navigation (Arrow Keys & Escape)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, nextImage, prevImage]);

    return (
        <MainLayout>
            <Head title="Gallery - Lab Infratek" />

            <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
                
                {/* Gallery Section */}
                <section className="relative pt-12 sm:pt-20 pb-20 px-6 overflow-hidden">
                    
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
                            {currentItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`relative group cursor-pointer animate-slide-up`}
                                    style={{ animationDelay: `${Math.min(index * 100, 600)}ms` }}
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => openLightbox(item.id)} // KLIK UNTUK BUKA LIGHTBOX
                                >
                                    {/* Glowing Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-110"></div>

                                    {/* Card */}
                                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
                                        {/* Image Container - 16:9 Aspect Ratio */}
                                        <div className="relative w-full aspect-video bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                                            
                                            {/* GAMBAR GALERI */}
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="object-cover w-full h-full"
                                            />

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
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Bottom Neon Line */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 shadow-lg shadow-blue-500/50"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-4 pb-12">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`group relative w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                                    currentPage === 1
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            {/* Page Numbers */}
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`group relative w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                                    currentPage === totalPages
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        {/* Page Info */}
                        <div className="text-center text-gray-500 text-sm">
                            Halaman {currentPage} dari {totalPages}
                        </div>
                    </div>
                </section>

                {/* --- LIGHTBOX (POPUP) SECTION --- */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
                        onClick={closeLightbox} // Klik area gelap untuk tutup
                    >
                        {/* Tombol Close */}
                        <button 
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 hover:bg-white/10 rounded-full transition-all"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        {/* Tombol Prev */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors hidden sm:block z-50"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        {/* Image Container */}
                        <div 
                            className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()} // Supaya klik gambar ga nutup modal
                        >
                            <img 
                                src={publicGalleries[lightboxIndex].image_url} 
                                alt={publicGalleries[lightboxIndex].title} 
                                className="w-auto h-auto max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
                            />
                            <div className="text-center mt-6 text-white animate-slide-up">
                                <h3 className="text-2xl font-bold mb-1">{publicGalleries[lightboxIndex].title}</h3>
                                <p className="text-lg text-gray-300">{publicGalleries[lightboxIndex].description}</p>
                                <p className="text-sm text-gray-500 font-mono mt-2 bg-white/10 inline-block px-3 py-1 rounded-full">
                                    {lightboxIndex + 1} / {publicGalleries.length}
                                </p>
                            </div>
                        </div>

                        {/* Tombol Next */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors hidden sm:block z-50"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
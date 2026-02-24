import { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image_url: string;
    is_public: number;
}

export default function Gallery() {
    // --- DATA DUMMY ---
    const dummyGalleries: GalleryItem[] = [
        { id: 1, title: "Kegiatan Pelatihan", description: "Dokumentasi kegiatan pelatihan jarkom", image_url: "/assets/images/gallery/1.jpg", is_public: 1 },
        { id: 2, title: "Kunjungan Industri", description: "Kunjungan ke Data Center", image_url: "/assets/images/gallery/2.jpg", is_public: 1 },
        { id: 3, title: "Rapat Kerja", description: "Rapat kerja pengurus lab", image_url: "/assets/images/gallery/3.jpg", is_public: 1 },
        { id: 4, title: "Dokumentasi Lab", description: "Suasana praktikum", image_url: "/assets/images/gallery/4.jpg", is_public: 1 },
        { id: 5, title: "Internal Meeting", description: "Rapat internal (Private)", image_url: "/assets/images/gallery/5.jpg", is_public: 0 },
        { id: 6, title: "Workshop", description: "Workshop Mikrotik", image_url: "/assets/images/gallery/6.jpg", is_public: 1 },
        { id: 7, title: "Seminar Nasional", description: "Seminar teknologi", image_url: "/assets/images/gallery/7.jpg", is_public: 1 },
        { id: 8, title: "Lomba Jarkom", description: "Lomba jaringan antar mahasiswa", image_url: "/assets/images/gallery/8.jpg", is_public: 1 },
        { id: 9, title: "Makrab", description: "Malam keakraban anggota", image_url: "/assets/images/gallery/9.jpg", is_public: 1 },
        { id: 10, title: "Foto Bersama", description: "Foto keluarga besar lab", image_url: "/assets/images/gallery/10.jpg", is_public: 1 },
        { id: 11, title: "Arsip Lama", description: "Dokumen lama (Private)", image_url: "/assets/images/gallery/11.jpg", is_public: 0 },
        { id: 12, title: "Kegiatan Harian", description: "Kegiatan sehari-hari di lab", image_url: "/assets/images/gallery/12.jpg", is_public: 1 },
        { id: 13, title: "Inventaris", description: "Pengecekan alat", image_url: "/assets/images/gallery/13.jpg", is_public: 1 },
    ];

    const publicGalleries = dummyGalleries.filter(item => item.is_public === 1);

    // --- PAGINATION ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(publicGalleries.length / itemsPerPage);
    const currentItems = publicGalleries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // --- LIGHTBOX ---
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const isOpen = lightboxIndex !== null;

    const openLightbox = (itemId: number) => {
        const index = publicGalleries.findIndex(img => img.id === itemId);
        setLightboxIndex(index);
    };

    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = useCallback(() => {
        if (lightboxIndex !== null) setLightboxIndex((prev) => (prev! + 1) % publicGalleries.length);
    }, [lightboxIndex, publicGalleries.length]);

    const prevImage = useCallback(() => {
        if (lightboxIndex !== null) setLightboxIndex((prev) => (prev! - 1 + publicGalleries.length) % publicGalleries.length);
    }, [lightboxIndex, publicGalleries.length]);

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

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-gallery-item {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
            `}</style>

            <div className="min-h-screen bg-slate-50 font-sans pb-24 overflow-hidden">
                
                {/* Header Section */}
                <section className="relative pt-32 pb-20 px-6 text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Gallery</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            Visualisasi perjalanan, kolaborasi, dan infrastruktur terkini di Laboratorium INFRATEK.
                        </p>
                        <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto mt-8 shadow-lg shadow-blue-500/20"></div>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="animate-gallery-item group relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => openLightbox(item.id)}
                            >
                                {/* Glowing Background Blur */}
                                <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                                    <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-100">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/1e293b?text=Infratek+Documentation' }}
                                        />
                                        
                                        {/* Overlay Neon Corners */}
                                        <div className="absolute inset-4 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-xl"></div>
                                        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 transition-all duration-500"></div>
                                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 transition-all duration-500"></div>

                                        {/* Hover Badge */}
                                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="bg-white text-blue-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                Enlarge Image
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-4 py-6">
                                        <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Modern */}
                    <div className="flex flex-col items-center mt-20 gap-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                                    currentPage === 1 ? "bg-slate-100 text-slate-300" : "bg-white text-blue-600 shadow-md hover:bg-blue-600 hover:text-white border border-slate-100"
                                }`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`relative w-12 h-12 rounded-2xl font-black text-sm transition-all duration-300 ${
                                            currentPage === page
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110"
                                                : "bg-white text-slate-400 hover:text-blue-600 border border-slate-100 hover:border-blue-200 shadow-sm"
                                        }`}
                                    >
                                        {page}
                                        {currentPage === page && (
                                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-white/40 rounded-full"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                                    currentPage === totalPages ? "bg-slate-100 text-slate-300" : "bg-white text-blue-600 shadow-md hover:bg-blue-600 hover:text-white border border-slate-100"
                                }`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                </section>

                {/* --- LIGHTBOX (MODERN POPUP) --- */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-hidden animate-fade-in"
                        onClick={closeLightbox}
                    >
                        {/* Glassmorphism Background */}
                        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"></div>
                        
                        {/* UI Controls */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[110]">
                            <div className="flex items-center gap-4">
                                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg">IMAGE {lightboxIndex + 1} / {publicGalleries.length}</span>
                                <h4 className="text-white font-bold hidden md:block">{publicGalleries[lightboxIndex].title}</h4>
                            </div>
                            <button onClick={closeLightbox} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Navigation Arrows */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-8 w-16 h-16 hidden lg:flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-2xl backdrop-blur-md transition-all z-[110] group"
                        >
                            <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        <button 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-8 w-16 h-16 hidden lg:flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-2xl backdrop-blur-md transition-all z-[110] group"
                        >
                            <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                        </button>

                        {/* Image & Text */}
                        <div 
                            className="relative max-w-5xl w-full flex flex-col items-center z-[105] animate-zoom-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group">
                                <img 
                                    src={publicGalleries[lightboxIndex].image_url} 
                                    alt={publicGalleries[lightboxIndex].title} 
                                    className="max-h-[75vh] w-auto rounded-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] object-contain"
                                />
                                {/* Mobile Nav Buttons Overlay */}
                                <div className="absolute inset-0 flex lg:hidden items-center justify-between px-4 pointer-events-none">
                                    <button onClick={prevImage} className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white pointer-events-auto"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg></button>
                                    <button onClick={nextImage} className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white pointer-events-auto"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg></button>
                                </div>
                            </div>

                            <div className="mt-8 text-center px-4">
                                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{publicGalleries[lightboxIndex].title}</h3>
                                <p className="text-blue-200 text-lg max-w-2xl font-medium leading-relaxed">{publicGalleries[lightboxIndex].description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
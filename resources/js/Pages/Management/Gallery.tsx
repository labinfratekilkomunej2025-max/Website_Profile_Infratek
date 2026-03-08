import { useState, useEffect} from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { getLocalTime } from "@/Utils";
import { PaginationData } from "@/SharedType";
import ManageLayout from '@/Layouts/ManagementLayout';

type Gallery = {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

type GalleryForm = {
  title: string;
  description: string;
}


type Image = {
    id: number|null,
}

type Props = {
    galleries_payload: GalleryPayload;
    is_admin: boolean;
}

type GalleryPayload = PaginationData & {
    data: Gallery[];
}

export default function Gallery(
        {galleries_payload, is_admin} : Props
    ) {
    var galleries = galleries_payload.data;
    
    const { props } = usePage<any>();
    const flash = props.flash;
    const [visible, setVisible] = useState(true);
    const Alert = ( type: 'success'|'error', message: string ) => {
        const base = "absolute top-4 z-10 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-between px-4 py-3 rounded shadow-lg";

        const styles: Record<string, string> = {
            'success': "flex inline-flex justify-between bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded",
            'error': "flex inline-flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded"
        };

        return (
            <div className={`${base} ${styles[type]}`} role="alert">
                <span className="block sm:inline pl-2">
                    <strong className="font-bold">Success</strong>
                    {message}
                </span>
                <span className="inline" onClick={() => setVisible(false)}>
                    <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path
                            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </span>
            </div>
        );
        };
    const currentPage = galleries_payload.current_page;
    const lastPage = galleries_payload.last_page;

    const MAX_VISIBLE = 4;

    let start = Math.max(currentPage - 1, 1);
    let end = start + MAX_VISIBLE - 1;

    if (end > lastPage) {
        end = lastPage;
        start = Math.max(end - MAX_VISIBLE + 1, 1);
    }

    const visiblePages = [];
    for (let i = start; i <= end; i++) {
        visiblePages.push(i);
    }
    const [imagesId, setImagesId] = useState<Image[]>([]);
    const [imageIdIndex, setImageIdIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const changeImage = async (id: number) => {
        try {
            const res = await axios.get(route("galleries.images", id));
            setImagesId(res.data);
            setImageIdIndex(0)
            setIsOpen(true);
        } catch (err) {
            console.error(err);
        }
    };
    const renderImageItem = (imgIndex: number)=>{
        const gallery = galleries?.[lightboxIndex];
        const image = imagesId?.[imgIndex!];

        if (!gallery || !image) return null;
        return (
            <img
                key={image.id}
                src={route('galleries.image', {
                    gallery: gallery.id,
                    image: image.id
                })}
                alt={gallery.title}
                loading="lazy"
                className={`
                    max-h-[75vh] w-auto rounded-3xl
                    shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]
                    object-contain
                    transition-all duration-250 ease-in-out
                    ${isAnimating
                        ? direction === 'next'
                            ? 'translate-x-10 opacity-0'
                            : '-translate-x-10 opacity-0'
                        : 'translate-x-0 opacity-100'
                    }
                `}
            />
        );
    }
    // --- LIGHTBOX ---
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const openLightbox = (itemId: number) => {
        changeImage(itemId);
        const index = galleries.findIndex(img => img.id === itemId);
        setLightboxIndex(index);
    };
    function RenderGalleryItem(galleries: Gallery[]){
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleries.map((item, index) => (
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
                                    src={route('galleries.image.tumbnail', item.id)}
                                    alt={item.title}
                                    loading="lazy"
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
                                        See Images
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 py-6">
                                <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-300 font-medium line-clamp-2 leading-relaxed">{getLocalTime(item.created_at, true)}</p>
                                <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>
                            <button
                                onClick={() =>  router.get(route('galleries.manage', item.id))}
                                className="w-full px-4 h-12 rounded-2xl bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition"
                            >
                                Kelola Berita
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    const visit = (url: string | null) => {
        if (!url) return;

        router.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['galleries_payload'],
        });
    };

    const closeLightbox = () => setIsOpen(false);

    const nextImage = () => {
        if (isAnimating || !imagesId.length) return;

        setDirection('next');
        setIsAnimating(true);

        setImageIdIndex(prev =>
            prev === null ? 0 : (prev + 1) % imagesId.length
        );

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // 1 detik lock
    };

    const prevImage = () => {
        if (isAnimating || !imagesId.length) return;

        setDirection('prev');
        setIsAnimating(true);

        setImageIdIndex(prev =>
            prev === null ? 0 : (prev - 1 + imagesId.length) % imagesId.length
        );

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

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

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<GalleryForm>({
        title: "",
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showForm]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.description) {
        alert("Semua field wajib diisi");
        return;
        }

        if (form.title.length > 255 || form.description.length > 255) {
        alert("Maksimal 255 karakter");
        return;
        }

        router.post(route('galleries.store'), form);

        // reset form
        setForm({ title: "", description: "" });
        setShowForm(false);
    };

    return (
        <ManageLayout>
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
                    {flash?.success && visible && (Alert('success', flash.success))}
                    {flash?.error && visible && (Alert('error', flash.error))}
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
                    {RenderGalleryItem(galleries)}
                    <div className="flex flex-col items-center mt-20 gap-6">

                        <div className="flex items-center gap-2">

                            {/* FIRST */}
                            <button
                                onClick={() => visit(galleries_payload.first_page_url)}
                                disabled={currentPage === 1}
                                className="px-4 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                            >
                                First
                            </button>

                            {/* PREV */}
                            <button
                                onClick={() => visit(galleries_payload.prev_page_url)}
                                disabled={!galleries_payload.prev_page_url}
                                className="w-12 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                            >
                                ‹
                            </button>

                            {/* PAGE NUMBERS (MAX 4) */}
                            {start > 1 && (
                                <>
                                    <button
                                        onClick={() => visit(`${galleries_payload.path}?page=1`)}
                                        className="w-12 h-12 rounded-2xl bg-white border shadow-sm"
                                    >
                                        1
                                    </button>
                                    {start > 2 && <span className="px-2">…</span>}
                                </>
                            )}

                            {visiblePages.map(page => (
                                <button
                                    key={page}
                                    onClick={() => visit(`${galleries_payload.path}?page=${page}`)}
                                    className={`w-12 h-12 rounded-2xl font-black text-sm transition-all
                                        ${page === currentPage
                                            ? "bg-blue-600 text-white shadow-lg scale-110"
                                            : "bg-white text-slate-400 border shadow-sm hover:text-blue-600"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {end < lastPage && (
                                <>
                                    {end < lastPage - 1 && <span className="px-2">…</span>}
                                    <button
                                        onClick={() => visit(`${galleries_payload.path}?page=${lastPage}`)}
                                        className="w-12 h-12 rounded-2xl bg-white border shadow-sm"
                                    >
                                        {lastPage}
                                    </button>
                                </>
                            )}

                            {/* NEXT */}
                            <button
                                onClick={() => visit(galleries_payload.next_page_url)}
                                disabled={!galleries_payload.next_page_url}
                                className="w-12 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                            >
                                ›
                            </button>

                            {/* LAST */}
                            <button
                                onClick={() => visit(galleries_payload.last_page_url)}
                                disabled={currentPage === lastPage}
                                className="px-4 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                            >
                                Last
                            </button>
                        </div>

                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            Page {currentPage} of {lastPage}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white text-2xl rounded-full shadow-lg hover:bg-blue-700 z-50"
                    >
                        +
                    </button>
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
                                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg">IMAGE {imageIdIndex + 1} / {imagesId?.length}</span>
                                <h4 className="text-white font-bold hidden md:block">{galleries[lightboxIndex].title}</h4>
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
                                {renderImageItem(imageIdIndex)}
                                {/* Mobile Nav Buttons Overlay */}
                                <div className="absolute inset-0 flex lg:hidden items-center justify-between px-4 pointer-events-none">
                                    <button onClick={prevImage} className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white pointer-events-auto"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg></button>
                                    <button onClick={nextImage} className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white pointer-events-auto"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg></button>
                                </div>
                            </div>

                            <div className="mt-8 text-center px-4">
                                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{galleries[lightboxIndex].title}</h3>
                                <p className="text-blue-200 text-lg max-w-2xl font-medium leading-relaxed">{galleries[lightboxIndex].description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl"
                    >
                        <h2 className="text-xl font-bold mb-4">Tambah Gallery</h2>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                maxLength={255}
                                value={form.title}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Description</label>
                            <textarea
                                name="description"
                                maxLength={255}
                                value={form.description}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>

                </div>
            )}
        </ManageLayout>
    );
}
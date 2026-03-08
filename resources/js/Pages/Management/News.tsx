import { Link, Head, router, usePage } from '@inertiajs/react';
import ManageLayout from '@/Layouts/ManagementLayout';
import {NewsGuest} from '@/SharedType';
import {getLocalTime} from '@/Utils';
import { PaginationData } from "@/SharedType";
import { useEffect, useState } from 'react';

type NewsForAll = NewsGuest & {
    creator: NewsCreator;
}
type NewsCreator = {
    id: number;
    name: string;
}

type NewsForm = {
  title: string;
  description: string;
  image: null | File;
}

type Props = PaginationData & {
  data: NewsForAll[];
}
type NewsPayload = {
  news_payload: Props;
}
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
);
export default function News(
  {news_payload} : NewsPayload
) {
  const { props } = usePage<any>();
  const flash = props.flash;
  const errors = props.errors;
  const [visible, setVisible] = useState(true);
  const Alert = ( type: 'success'|'error', message: string ) => {
      const base = "absolute top-20 z-10 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-between px-4 py-3 rounded shadow-lg";

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

  const news = news_payload.data

  const currentPage = news_payload.current_page;
  const lastPage = news_payload.last_page;
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
  const visit = (url: string | null) => {
      if (!url) return;

      router.get(url, {}, {
          preserveState: true,
          preserveScroll: true,
          only: ['news_payload'],
      });
  };

  const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<NewsForm>({
        title: "",
        description: "",
        image: null,
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

      router.post(route('news.store'), form);

      // reset form
      setForm({ title: "", description: "", image:null });
      setShowForm(false);
  };

  return (
    <ManageLayout>
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
        {flash?.success && visible && (Alert('success', flash.success))}
        {flash?.error && visible && (Alert('error', flash.error))}
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
            {news.map((news, idx) => (
              <div key={news.id} style={{ animation: `fadeInUp 0.8s ease-out ${0.2 * (idx+1)}s both` }} className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
                {/* Thumbnail Container */}
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  {<img 
                    src={route('news.tumbnail', news.id)} 
                    alt={news.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    // @ts-ignore
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found' }} // Fallback if image breaks
                  />}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                    TERBARU
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {getLocalTime(news.created_at, true)}
                    </span>
                    {news.creator!=null && (<span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      {news.creator.name}
                    </span>)}
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
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <Link 
                    href={route('news.detail', {
                      news: news.id,
                      from: window.location.href,
                    })}
                    className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-indigo-600 transition-colors"
                  >
                    Baca selengkapnya
                    <ArrowIcon />
                  </Link>
                  <button
                    onClick={() =>  router.get(route('news.manage', news.id))}
                    className="px-4 h-12 rounded-2xl bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition"
                  >
                    Kelola Berita
                  </button>
                </div>
                </div>
              </div>
            ))}
            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white text-2xl rounded-full shadow-lg hover:bg-blue-700 z-50"
            >
                +
            </button>
          </div>

          {/* Pagination Modern */}
          <div className="flex flex-col items-center mt-20 gap-6">

            <div className="flex items-center gap-2">

                {/* FIRST */}
                <button
                    onClick={() => visit(news_payload.first_page_url)}
                    disabled={currentPage === 1}
                    className="px-4 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                >
                    First
                </button>

                {/* PREV */}
                <button
                    onClick={() => visit(news_payload.prev_page_url)}
                    disabled={!news_payload.prev_page_url}
                    className="w-12 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                >
                    ‹
                </button>

                {/* PAGE NUMBERS (MAX 4) */}
                {start > 1 && (
                    <>
                        <button
                            onClick={() => visit(`${news_payload.path}?page=1`)}
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
                        onClick={() => visit(`${news_payload.path}?page=${page}`)}
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
                            onClick={() => visit(`${news_payload.path}?page=${lastPage}`)}
                            className="w-12 h-12 rounded-2xl bg-white border shadow-sm"
                        >
                            {lastPage}
                        </button>
                    </>
                )}

                {/* NEXT */}
                <button
                    onClick={() => visit(news_payload.next_page_url)}
                    disabled={!news_payload.next_page_url}
                    className="w-12 h-12 rounded-2xl bg-white border shadow-sm disabled:opacity-40"
                >
                    ›
                </button>

                {/* LAST */}
                <button
                    onClick={() => visit(news_payload.last_page_url)}
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
        {/* Form */}
        {showForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl"
                >
                    <h2 className="text-xl font-bold mb-4">Tambah Gallery</h2>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Tumbnail</label>
                        <input
                        type="file"
                        onChange={(e) =>
                            setForm({
                            ...form,
                            image: e.target.files?.[0] ?? null,
                            })
                        }
                        />
                        {errors?.image && (
                            <div className="text-red-500 text-xs mt-1">{errors.image}</div>
                        )}
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
        </section>
      </div>
    </ManageLayout>
  );
}
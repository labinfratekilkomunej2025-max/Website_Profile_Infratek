import { Link, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {NewsGuest} from '@/SharedType';
import { getLocalTime } from '@/Utils';
import { PageProps } from '@/types';
// Interface untuk tipe data konten dinamis
type NewsComponent = {
    id: number;
    news_id: number;
    type: string;
    text_content: string|null;
    image_path:string|null;
    is_tumbnail:boolean|null;
    order:number;
    created_by_id:number|null;
    alt_text:string|null;
}
type NewsData = NewsGuest & {
    creator: NewsCreator;
    news_components: NewsComponent[];
}
type NewsCreator = {
    id: number;
    name: string;
}
type Props = PageProps & {
    news: NewsData;
    prev_link: string;
}

export default function NewsDetail(
    {auth, news, prev_link} : Props
) {
    const news_components = news.news_components;
    console.log(news)
    return (
        <MainLayout>
            <Head title={`${news.title} - Lab Infratek`} />

            {news_components.length!=0 ? (<div className="min-h-screen bg-white">
                
                {/* HERO SECTION - THUMBNAIL */}
                <div className="relative h-[60vh] min-h-[400px]">
                    <div className="absolute inset-0">
                        <img 
                            src={route('news.tumbnail', news.id)} 
                            alt={news.title} 
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                    </div>
                    
                    {/* Judul & Meta di atas gambar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {news.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-300 text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                {getLocalTime(news.created_at, true)}
                            </div>
                            {news.creator!=null && (<div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                {news.creator.name}
                            </div>)}
                        </div>
                    </div>
                </div>

                {/* CONTENT BODY */}
                <div className="max-w-3xl mx-auto px-6 py-12">
                    <article className="space-y-8">
                        {/* LOGIC RENDER: Loop isi konten sesuai urutan */}
                        {news_components?.map((block, index) => {
                            // Render Teks
                            if (block.type === 'text') {
                                return (
                                    <p key={index} className="text-gray-700 text-lg leading-relaxed">
                                        {block.text_content}
                                    </p>
                                );
                            }
                            
                            // Render Gambar
                            if (block.type === 'image') {
                                return (
                                    <figure key={index} className="my-8 group">
                                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                            <img 
                                                src={route('news.image',block.id)} 
                                                alt={block.alt_text || "Gambar Artikel"} 
                                                loading="lazy"
                                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        {block.text_content && (
                                            <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
                                                {block.text_content}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }

                            // Render Quote
                            if (block.type === 'quote') {
                                return (
                                    <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-xl text-gray-800 bg-blue-50 rounded-r-lg">
                                        "{block.text_content}"
                                    </blockquote>
                                );
                            }
                        })}
                    </article>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-12"></div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                        <Link 
                            href={prev_link}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Kembali ke Berita
                        </Link>
                        
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            </button>
                            <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>)
            : (
                <div>
                    Belum ada Data yang Ditambahkan
                </div>
            )}
        </MainLayout>
    );
}
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Contact() {
  return (
    <MainLayout>
      <Head title="Contact - Lab Infratek" />

      {/* INJEKSI CSS ANIMASI */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-floating {
          animation: floating 4s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-sans pb-24 overflow-hidden">
        
        {/* Header Section */}
        <section className="relative pt-32 pb-20 px-6 text-center">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] animate-floating"></div>
            <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-[100px] animate-floating" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-700 font-black text-[10px] uppercase tracking-[0.2em]">
              Connect With Us
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Punya pertanyaan mengenai praktikum, riset, atau kolaborasi? Tim asisten dan admin kami siap membantu Anda.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Quick Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Email Card */}
              <div className="animate-fadeInUp group" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Email Address</h3>
                      <a href="mailto:labinfratekilkomunej@gmail.com" className="text-blue-600 font-bold hover:text-indigo-600 transition-colors break-all">
                        labinfratekilkomunej@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="animate-fadeInUp group" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">WhatsApp Hotline</h3>
                      <a href="https://wa.me/6281216519331" target="_blank" className="text-green-600 font-bold hover:text-green-700 transition-colors">
                        +62 812-1651-9331
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-900/20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="font-extrabold text-xl">Jam Operasional</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-slate-400 font-medium">Senin - Jumat</span>
                      <span className="text-blue-400 font-black">08.00 - 16.00</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-slate-400 font-medium">Sabtu - Minggu</span>
                      <span className="text-red-400 font-black uppercase text-xs tracking-widest">Tutup</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-4">
                      *Jam operasional dapat berubah sewaktu-waktu sesuai dengan jadwal praktikum atau hari libur nasional.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Address & Map */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Address Card */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 group transition-all duration-500 hover:shadow-2xl">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-2xl mb-4 tracking-tight">Location Details</h3>
                      <div className="space-y-2 text-slate-600 font-medium">
                        <p className="text-lg text-slate-800 font-bold">Laboratorium Infrastruktur Teknologi</p>
                        <p>Fakultas Ilmu Komputer, Universitas Jember</p>
                        <p>Jl. Kalimantan No. 37, Kampus Tegalboto</p>
                        <p>Kec. Sumbersari, Kabupaten Jember, Jawa Timur 68121</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Google Maps Placeholder/Frame */}
                  <div className="mt-8 rounded-2xl overflow-hidden h-64 border-4 border-slate-50 bg-slate-100 relative group/map">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.3243936940027!2d113.71452247573618!3d-8.16999208187884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd69436894c1607%3A0x60037a59d997d913!2sFakultas%20Ilmu%20Komputer%20Universitas%20Jember!5e0!3m2!1sid!2sid!4v1708800000000!5m2!1sid!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale-[50%] contrast-[1.1] group-hover/map:grayscale-0 transition-all duration-700"
                    ></iframe>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-24 max-w-4xl mx-auto px-6 text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
            <div className="bg-white rounded-[2.4rem] p-10 md:p-16">
              <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Ready to Visit Us?</h2>
              <p className="text-slate-500 font-medium mb-8">Kami selalu terbuka untuk kunjungan mahasiswa, praktisi, atau instansi yang ingin berdiskusi mengenai infrastruktur IT.</p>
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/uX3f2tV6z7z8z9z10', '_blank')}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-blue-600 transition-all duration-300 hover:scale-105"
              >
                Buka di Google Maps
              </button>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}
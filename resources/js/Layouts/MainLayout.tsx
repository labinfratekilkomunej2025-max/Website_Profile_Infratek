import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-sans antialiased">
            {/* Metadata Global */}
            <Head>
                <title>LAB INFRATEK</title>
                <meta 
                    name="description" 
                    content="Laboratorium Infrastruktur Teknologi - Fakultas Ilmu Komputer Universitas Jember" 
                />
                <link rel="icon" href="/infratek.jpg" />
            </Head>

            {/* Navbar selalu di atas */}
            <Navbar />

            {/* Konten Halaman (Children) */}
            {/* Kita kasih padding-top (pt-20) supaya tidak ketutup Navbar yang fixed */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Footer selalu di bawah */}
            <Footer />
        </div>
    );
}
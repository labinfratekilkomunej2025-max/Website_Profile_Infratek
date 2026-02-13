// import Link from "next/link";
// import Image from "next/image";
import { useState, useEffect } from "react";
import { NavbarProps } from '@/types';
// import { usePathname } from "next/navigation";

// export default function Navbar() {}
export default function Navbar({
  CurrentPath,
  HomePath,
  GalleryPath,
  ContactPath,
}: NavbarProps
) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-blue-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative rounded-lg shadow-xl overflow-hidden w-10 h-10 sm:w-12 sm:h-12">
                <img
                  src="/assets/images/logo/infratek.jpg"
                  alt="Logo INFRATEK"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                LAB INFRATEK
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-600 hidden sm:block">
                Lab Infrastruktur Teknologi
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href={HomePath}
              className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
                CurrentPath === HomePath
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <span className="relative z-10">Home</span>
              {CurrentPath === HomePath && (
                <>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20 scale-100 opacity-100"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></span>
                </>
              )}
              {CurrentPath !== HomePath && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20 transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"></span>
              )}
            </a>

            <a
              href={GalleryPath}
              className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
                CurrentPath === GalleryPath
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <span className="relative z-10">Gallery</span>
              {CurrentPath === GalleryPath && (
                <>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20 scale-100 opacity-100"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></span>
                </>
              )}
              {CurrentPath !== GalleryPath && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20 transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"></span>
              )}
            </a>

            <a
              href={ContactPath}
              className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
                CurrentPath ===  ContactPath
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <span className="relative z-10">Contact</span>
              {CurrentPath ===  ContactPath && (
                <>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20 scale-100 opacity-100"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></span>
                </>
              )}
              {CurrentPath !==  ContactPath && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20 transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"></span>
              )}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            <a
              href={HomePath}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                CurrentPath === HomePath
                  ? "bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Home
            </a>
            <a
              href={GalleryPath}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                CurrentPath === GalleryPath
                  ? "bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Gallery
            </a>
            <a
              href = {ContactPath}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                CurrentPath ===  ContactPath
                  ? "bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Contact
            </a>
          </div>
        )}
      </div>

      {/* Decorative Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
    </nav>
  );
}

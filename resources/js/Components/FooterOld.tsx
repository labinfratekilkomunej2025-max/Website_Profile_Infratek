import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg shadow-xl shadow-blue-500/30 overflow-hidden w-10 h-10">
                <Image
                  src="/assets/images/logo/infratek.jpg"
                  alt="Logo INFRATEK"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold">LAB INFRATEK</h3>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Laboratorium Infrastruktur Teknologi - Empowering Network
              Infrastructure & Operating Systems Excellence
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-blue-500/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(
                        link.toLowerCase()
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-blue-200 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300 shadow-lg shadow-blue-500/50"></span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-blue-500/30 pb-2">
              Social Media
            </h3>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-all duration-300">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/company/laboratorium-infrastruktur-teknologi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300 text-xs break-words"
                  >
                    Laboratorium Infrastruktur Teknologi
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-all duration-300">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Instagram</p>
                  <a
                    href="https://www.instagram.com/infratekilkomunej"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300 text-xs"
                  >
                    @infratekilkomuenj
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-200 text-sm">
            © 2025 INFRATEK. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Facebook", "Twitter", "Instagram"].map((social) => (
              <button
                key={social}
                className="bg-blue-500/20 hover:bg-blue-500/40 p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                aria-label={social}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Neon Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg shadow-blue-500/50"></div>
    </footer>
  );
}

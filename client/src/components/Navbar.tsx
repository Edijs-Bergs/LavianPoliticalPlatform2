import { useState, useEffect } from "react";
import blueLogo from "@assets/blue_logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`bg-white fixed w-full z-50 ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-24"> {/* Increased height from h-16 to h-24 */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-12 w-auto" src={blueLogo} alt="Latvijas Attīstībai logo" />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("kandidati")} 
              className="text-[#013196] font-semibold hover:text-blue-700 transition"
            >
              KANDIDĀTI
            </button>
            <button 
              onClick={() => scrollToSection("programma")} 
              className="text-[#013196] font-semibold hover:text-blue-700 transition"
            >
              PROGRAMMA
            </button>
            <button 
              onClick={() => scrollToSection("manifests")} 
              className="text-[#013196] font-semibold hover:text-blue-700 transition"
            >
              MANIFESTS
            </button>
            <button 
              onClick={() => scrollToSection("social")} 
              className="text-[#013196] font-semibold hover:text-blue-700 transition"
            >
              SOCIĀLIE TĪKLI
            </button>
            <button 
              onClick={() => scrollToSection("kontakti")} 
              className="text-[#013196] font-semibold hover:text-blue-700 transition"
            >
              KONTAKTI
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#013196] focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => scrollToSection("kandidati")} 
            className="block w-full text-left px-3 py-2 text-[#013196] font-medium hover:bg-blue-50 rounded-[15px]"
          >
            KANDIDĀTI
          </button>
          <button 
            onClick={() => scrollToSection("programma")} 
            className="block w-full text-left px-3 py-2 text-[#013196] font-medium hover:bg-blue-50 rounded-[15px]"
          >
            PROGRAMMA
          </button>
          <button 
            onClick={() => scrollToSection("manifests")} 
            className="block w-full text-left px-3 py-2 text-[#013196] font-medium hover:bg-blue-50 rounded-[15px]"
          >
            MANIFESTS
          </button>
          <button 
            onClick={() => scrollToSection("social")} 
            className="block w-full text-left px-3 py-2 text-[#013196] font-medium hover:bg-blue-50 rounded-[15px]"
          >
            SOCIĀLIE TĪKLI
          </button>
          <button 
            onClick={() => scrollToSection("kontakti")} 
            className="block w-full text-left px-3 py-2 text-[#013196] font-medium hover:bg-blue-50 rounded-[15px]"
          >
            KONTAKTI
          </button>
        </div>
      </div>
    </nav>
  );
}

import whiteLogo from "@assets/balts_logo.png";

export default function Footer() {
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
  };

  return (
    <footer className="bg-[#013196] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: Horizontal links with centered smaller logo */}
        <div className="flex flex-col items-center">
          {/* Navigation links - horizontal on desktop */}
          <div className="hidden md:flex space-x-8 mb-8">
            <button onClick={() => scrollToSection("kandidati")} className="hover:text-blue-200 transition text-[18px]">KANDIDĀTI</button>
            <button onClick={() => scrollToSection("programma")} className="hover:text-blue-200 transition text-[18px]">PROGRAMMA</button>
            <button onClick={() => scrollToSection("manifests")} className="hover:text-blue-200 transition text-[18px]">MANIFESTS</button>
            <button onClick={() => scrollToSection("social")} className="hover:text-blue-200 transition text-[18px]">SOCIĀLIE TĪKLI</button>
            <button onClick={() => scrollToSection("kontakti")} className="hover:text-blue-200 transition text-[18px]">KONTAKTI</button>
          </div>
          
          {/* Logo - centered on desktop */}
          <div className="mb-6 md:mb-8 text-center">
            <img src={whiteLogo} alt="Latvijas Attīstībai" className="h-16 mx-auto" />
            <p className="mt-2 text-[18px]">Olaines novada nākotnei</p>
          </div>
          
          {/* Mobile navigation - stacked */}
          <div className="flex flex-col space-y-2 text-center md:hidden mb-6">
            <button onClick={() => scrollToSection("kandidati")} className="hover:text-blue-200 transition">KANDIDĀTI</button>
            <button onClick={() => scrollToSection("programma")} className="hover:text-blue-200 transition">PROGRAMMA</button>
            <button onClick={() => scrollToSection("manifests")} className="hover:text-blue-200 transition">MANIFESTS</button>
            <button onClick={() => scrollToSection("social")} className="hover:text-blue-200 transition">SOCIĀLIE TĪKLI</button>
            <button onClick={() => scrollToSection("kontakti")} className="hover:text-blue-200 transition">KONTAKTI</button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-blue-700 text-center">
          <p>© {new Date().getFullYear()} Latvijas Attīstībai. Visas tiesības aizsargātas.</p>
        </div>
      </div>
    </footer>
  );
}

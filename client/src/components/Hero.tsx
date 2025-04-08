import heroBanner from "@assets/004_DSC_3755.jpg";

export default function Hero() {
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
    <header className="relative pt-16">
      <div 
        className="w-full h-[60vh] md:h-[75vh] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        {/* Subtle gradient overlay instead of solid blue */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(1,49,150,0.15)] flex flex-col justify-end items-center text-white pb-12">
          {/* Text positioned lower */}
          <h1 className="text-3xl md:text-5xl font-bold text-center px-4 tracking-wide bg-[rgba(1,49,150,0.7)] py-4 rounded-[30px] mx-4 max-w-full">
            KOMANDA TAVA OLAINES NOVADA NĀKOTNE
          </h1>
        </div>
      </div>
    </header>
  );
}

import { useQuery } from "@tanstack/react-query";
import { fetchCompleteProgramSections } from "../lib/data";
import { useEffect, useRef, useState } from "react";
import SuggestionForm from "./SuggestionForm";

export default function ProgramSection() {
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  
  // Create a ref for the section container
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const { data: programSections = [], isLoading } = useQuery({
    queryKey: ['/api/program-sections/complete'],
    queryFn: fetchCompleteProgramSections
  });
  
  // Initialize visibility state when sections change
  useEffect(() => {
    if (programSections && programSections.length > 0) {
      setIsVisible(new Array(programSections.length).fill(false));
      // Initialize refs array
      sectionRefs.current = new Array(programSections.length).fill(null);
    }
  }, [programSections]);
  
  // Set up intersection observer for scroll animations
  useEffect(() => {
    if (!programSections || programSections.length === 0) return;
    
    // Set all sections to be visible immediately for now (we can reintroduce animation later)
    setIsVisible(new Array(programSections.length).fill(true));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setIsVisible(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    
    // Observe all section elements
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [programSections]);
  
  if (isLoading) {
    return (
      <section id="programma" className="py-16 bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">PROGRAMMA</h2>
          <div className="space-y-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="h-12 bg-blue-200 rounded-t-[30px] mb-1"></div>
                <div className="h-64 bg-gray-200 rounded-b-[30px]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="programma" className="py-16 bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">PROGRAMMA</h2>
        
        <div className="bg-white p-6 rounded-[30px] shadow-lg mb-10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xl text-gray-800 mb-4 md:mb-0 md:pr-4">Iesniedziet savu ideju vai ieteikumu, kā padarīt Olaines novadu vēl labāku!</p>
          <a 
            href="#suggestion-form" 
            className="bg-[#013196] text-white font-bold py-3 px-6 rounded-[15px] hover:bg-blue-800 transition"
          >
            Iesniegt Ieteikumu
          </a>
        </div>
        
        <div className="space-y-8">
          {programSections.map((section: any, index: number) => (
            <div 
              key={section.id}
              ref={el => sectionRefs.current[index] = el}
              className={`
                mb-8 bg-white rounded-[30px] shadow-lg overflow-hidden 
                transform transition-all duration-1000 ease-in-out
                ${isVisible[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
              <div className="bg-[#013196] text-white p-5 flex items-center">
                <i className={`${section.icon} text-3xl mr-4`}></i>
                <h3 className="text-[25px] font-bold">{section.title}</h3>
              </div>
              <div className="p-6 text-gray-800">
                <p 
                  className="text-[25px] font-semibold mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: `Mērķis: ${section.goal.replace(/\r?\n/g, '<br />')}` 
                  }}
                ></p>
                <ul className="list-disc list-inside space-y-3">
                  {section.items && section.items.map((item: any, itemIndex: number) => (
                    <li 
                      key={itemIndex} 
                      className="text-[20px]"
                      dangerouslySetInnerHTML={{ 
                        __html: item.replace(/\r?\n/g, '<br />') 
                      }}
                    ></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <SuggestionForm />
      </div>
    </section>
  );
}
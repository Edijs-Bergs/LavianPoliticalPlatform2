import blueLogo from "@assets/blue_logo.png";
import type { Candidate } from "@shared/schema";
import { useEffect, useRef } from "react";

interface CandidateCardProps {
  candidate: Candidate;
  reverse: boolean;
  index: number;
}

export default function CandidateCard({ candidate, reverse, index }: CandidateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('opacity-100');
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={cardRef} className="relative mb-16 bg-[#f2f2f2] shadow-lg rounded-[30px] overflow-hidden opacity-0 transition-opacity duration-700">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className="md:w-1/2 p-4"> {/* Added padding */}
          <div className={`bg-[#013196] text-white py-3 px-4 rounded-[30px] text-center mb-4`}> {/* Added rounded corners and centered text */}
            <p className="font-bold text-[25px]">{candidate.party}</p>
            <p className="text-[20px]">{candidate.region}</p>
          </div>
          <div className="relative pb-[133%] rounded-[30px] overflow-hidden"> {/* 3:4 aspect ratio (75% width:100% height, inverted = 4:3 height:width = 133%) */}
            <img 
              src={candidate.photo} 
              alt={candidate.name} 
              className="absolute top-0 left-0 w-full h-full object-cover rounded-[30px]"
            />
          </div>
          <div className="bg-[#013196] text-white py-3 px-4 mt-4 rounded-[30px] text-center"> {/* Added rounded corners and centered text */}
            <p className="font-bold text-[28px]">{candidate.name}</p>
            <p className="text-[15px]">{candidate.title}</p>
            {candidate.additionalTitle != null && <p className="text-[15px]">{candidate.additionalTitle}</p>}
          </div>
        </div>
        <div className="md:w-1/2 p-6 md:p-8 flex items-center relative"> {/* Added relative for positioning */}
          <p 
            className="text-gray-800 leading-relaxed text-[22px]"
            dangerouslySetInnerHTML={{ 
              __html: candidate.about.replace(/\r?\n/g, '<br />') 
            }}
          ></p>
          
          {/* Logo positioned at the bottom right for mobile, and at top based on reverse for desktop */}
          <img 
            src={blueLogo} 
            alt="Latvijas Attīstībai logo" 
            className={`absolute bottom-6 right-6 md:bottom-auto md:top-6 ${reverse ? 'md:left-6' : 'md:right-6'} h-7 md:h-9 w-auto`} 
          />
          
          {/* Number positioned at bottom left for mobile, but on opposite side of image in desktop */}
          <div className={`absolute bottom-6 left-6 md:bottom-6 ${!reverse ? 'md:right-6' : 'md:left-6'} flex flex-col items-center text-[#013196]`}>
            <span className="text-[23px] font-bold">Nr.</span>
            <span className="text-[45px] font-bold leading-none">{index + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

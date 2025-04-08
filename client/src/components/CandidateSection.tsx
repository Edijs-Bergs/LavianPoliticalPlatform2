import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CandidateCard from "./CandidateCard";
import { fetchCandidates } from "../lib/data";
import type { Candidate } from "@shared/schema";

export default function CandidateSection() {
  const [showAll, setShowAll] = useState(false);
  
  const { data: candidates = [], isLoading, error } = useQuery<Candidate[]>({
    queryKey: ['/api/candidates'],
    queryFn: async () => {
      const result = await fetchCandidates();
      return result;
    }
  });
  
  // Initially show only first 3 candidates
  const displayedCandidates = showAll ? candidates : candidates.slice(0, 3);
  
  if (isLoading) {
    return (
      <section id="kandidati" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">KOMANDA</h2>
          <div className="flex justify-center">
            <div className="animate-pulse h-96 w-full bg-gray-200 rounded-[30px]"></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    console.error("Error fetching candidates:", error);
  }
  
  return (
    <section id="kandidati" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#013196] text-center mb-12">KOMANDA</h2>
        
        {displayedCandidates.map((candidate, index) => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate as any}
            reverse={index % 2 === 1}
            index={index} // Pass the index for proper consecutive numbering
          />
        ))}
        
        {candidates.length > 3 && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="bg-[#013196] text-white font-bold py-3 px-6 rounded-full hover:bg-blue-800 transition"
            >
              {showAll ? "REDZĒT MAZĀK" : "REDZĒT VISUS KANDIDĀTUS"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
